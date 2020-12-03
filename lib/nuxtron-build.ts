import arg from 'arg';
import chalk from 'chalk';
import { SpawnSyncOptions } from 'child_process';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import path from 'path';
import log from './logger';
import { getNuxtronConfig } from './webpack/helpers';

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--all': Boolean,
  '--win': Boolean,
  '--mac': Boolean,
  '--linux': Boolean,
  '--x64': Boolean,
  '--ia32': Boolean,
  '--armv7l': Boolean,
  '--arm64': Boolean,
  '--config': String,
  '-h': '--help',
  '-v': '--version',
  '-w': '--win',
  '-m': '--mac',
  '-l': '--linux',
  '-c': '--config'
});

if (args['--help']) {
  console.log(chalk`
    {bold.cyan nuxtron build} - Build and export the application for production deployment

    {bold USAGE}

      {bold $} {cyan nuxtron build} --help
      {bold $} {cyan nuxtron build} [options]

    {bold OPTIONS}

      --help,    -h  shows this help message
      --version, -v  displays the current version of nuxtron
      --all          builds for Windows, macOS and Linux
      --win,     -w  builds for Windows, accepts target list (see https://goo.gl/jYsTEJ)
      --mac,     -m  builds for macOS, accepts target list (see https://goo.gl/5uHuzj)
      --linux,   -l  builds for Linux, accepts target list (see https://goo.gl/4vwQad) 
      --x64          builds for x64
      --ia32         builds for ia32
      --armv7l       builds for armv7l
      --arm64        builds for arm64
  `);
  process.exit(0);
}

const cwd = process.cwd();
const nuxt = fs.existsSync(path.join(cwd, 'tsconfig.json')) ? 'nuxt-ts' : 'nuxt';

const spawnOptions: SpawnSyncOptions = {
  cwd,
  stdio: 'inherit'
};

async function build() {
  // Ignore missing dependencies
  process.env.ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES = 'true';

  const rendererSrcDir = getNuxtronConfig().rendererSrcDir || 'renderer';

  try {
    log('Clearing previous builds');
    fs.removeSync(path.join(cwd, 'app'));
    fs.removeSync(path.join(cwd, 'dist'));
    fs.removeSync(path.join(cwd, rendererSrcDir, '.nuxt'));

    log('Building renderer process');
    const outdir = path.join(cwd, rendererSrcDir, 'dist');
    const appdir = path.join(cwd, 'app');
    spawn.sync(nuxt, [
      'build',
      path.join(cwd, rendererSrcDir)
    ], spawnOptions);
    spawn.sync(nuxt, [
      'generate',
      path.join(cwd, rendererSrcDir)
    ], spawnOptions);
    fs.copySync(outdir, appdir);
    fs.removeSync(outdir);

    log('Building main process');
    spawn.sync('node', [path.join(__dirname, 'webpack/build.production.js')], spawnOptions);

    log('Packaging - please wait a moment');
    spawn.sync('electron-builder', createBuilderArgs(), spawnOptions);

    log('See `dist` directory');
  } catch (error) {
    console.log(chalk`

{bold.red Cannot build electron packages:}
{bold.yellow ${error}}
`);
    process.exit(1);
  }
}

function createBuilderArgs() {
  let results = [];
  if (args['--config']) {
    results.push('--config');
    results.push(args['--config'] || 'electron-builder.yml');
  }
  if (args['--all']) {
    results.push('-wml');
    results.push(...createArchArgs());
  } else {
    args['--win'] && results.push('--win');
    args['--mac'] && results.push('--mac');
    args['--linux'] && results.push('--linux');
    results.push(...createArchArgs());
  }
  return results;
}

function createArchArgs() {
  let archArgs = [];
  args['--x64'] && archArgs.push('--x64');
  args['--ia32'] && archArgs.push('--ia32');
  args['--armv7l'] && archArgs.push('--armv7l');
  args['--arm64'] && archArgs.push('--arm64');
  return archArgs;
}

(async () => await build())();
