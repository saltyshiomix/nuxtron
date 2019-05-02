import arg from 'arg';
import chalk from 'chalk';
// import { npx, npxSync } from 'node-npx';
import { ChildProcess } from 'child_process';
import delay from 'delay';
import webpack from 'webpack';

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--custom-server': String,
  '-h': '--help',
  '-v': '--version',
  '-c': '--custom-server',
});

if (args['--help']) {
  console.log(chalk`
    {bold.cyan nuxtron dev} - Starts the nuxtron application in development mode

    {bold USAGE}

      {bold $} {cyan nuxtron dev} --help
      {bold $} {cyan nuxtron dev}

    {bold OPTIONS}

      --help,    -h  shows this help message
      --version, -v  displays the current version of nuxtron
  `);
  process.exit(0);
}

async function dev() {
  const { npx, npxSync } = require('node-npx');
  const config = require('./webpack/webpack.main.config');
  const cwd = process.cwd();

  const startRendererProcess = () => {
    let child: ChildProcess;
    if (args['--custom-server']) {
      const { existsSync } = require('fs');
      if (existsSync('nodemon.json')) {
        child = npx('nodemon', [args['--custom-server']], {
          cwd,
          stdio: 'inherit',
        });
      } else {
        child = npx('node', [args['--custom-server']], {
          cwd,
          stdio: 'inherit',
        });
      }
    } else {
      child = npx('nuxt', ['-p', '8888', 'renderer'], {
        cwd,
        stdio: 'inherit',
      });
    }
    child.on('close', () => {
      process.exit(0);
    });
    return child;
  };

  let watching: webpack.Compiler.Watching;
  let rendererProcess: ChildProcess;
  const killWholeProcess = () => {
    if (watching) {
      watching.close(() => {});
    }
    if (rendererProcess) {
      rendererProcess.kill();
    }
  };

  process.on('SIGINT', killWholeProcess);
  process.on('SIGTERM', killWholeProcess);
  process.on('exit', killWholeProcess);

  rendererProcess = startRendererProcess();

  // wait until renderer process is ready
  await delay(8000);

  const compiler = webpack(config('development'));
  let isHotReload = false;
  watching = compiler.watch({}, async (err, stats) => {
    if (!err && !stats.hasErrors()) {
      if (isHotReload) {
        await delay(2000);
      }
      isHotReload = true;
      await npxSync('electron', ['.'], { cwd, stdio: 'inherit' });
    }
  });
}

dev();
