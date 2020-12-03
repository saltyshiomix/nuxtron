import chalk from 'chalk';
import spawn from 'cross-spawn';
import path from 'path';

const defaultCommand = 'dev';
const commands = new Set([
  'list',
  'init',
  'build',
  defaultCommand
]);

let cmd = process.argv[2];
let args: string[] = [];
let nodeArgs: string[] = [];

if (new Set([
  '--version',
  '-v'
]).has(cmd)) {
  const pkg = require(path.resolve(__dirname, '../package.json'));
  console.log(`nuxtron v${pkg.version}`);
  process.exit(0);
}

if (new Set([
  '--help',
  '-h'
]).has(cmd)) {
  console.log(chalk`
    {bold.cyan nuxtron} - ⚡ Electron + Nuxt.js ⚡
    {bold USAGE}
      {bold $} {cyan nuxtron init} --help
      {bold $} {cyan nuxtron init} {underline my-app}
      {bold $} {cyan nuxtron init} {underline my-app} [--example {underline example_folder_name}]
  `);
  process.exit(0);
}

const inspectArg = process.argv.find(arg => arg.includes('--inspect'));
if (inspectArg) {
  nodeArgs.push(inspectArg);
}

if (commands.has(cmd)) {
  args = process.argv.slice(3);
} else {
  cmd = defaultCommand;
  args = process.argv.slice(2);
}

const defaultEnv = 'dev' === cmd ? 'development' : 'production';
process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv;

const cli = path.join(__dirname, `nuxtron-${cmd}`);

const startProcess = () => {
  const proc = spawn('node', [
    ...nodeArgs,
    cli,
    ...args
  ], {
    stdio: 'inherit'
  });
  proc.on('close', (code: number, signal: string) => {
    if (null !== code) {
      process.exit(code);
    }
    if (signal) {
      if ('SIGKILL' === signal) {
        process.exit(137);
      }
      process.exit(1);
    }
    process.exit(0);
  });
  proc.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
  return proc;
};

const proc = startProcess();

const wrapper = () => {
  if (proc) {
    proc.kill();
  }
};
process.on('SIGINT', wrapper);
process.on('SIGTERM', wrapper);
process.on('exit', wrapper);
