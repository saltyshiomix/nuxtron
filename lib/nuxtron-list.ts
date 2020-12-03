import arg from 'arg';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
  '-v': '--version'
});

if (args['--version']) {
  const pkg = require(path.resolve(__dirname, '../package.json'));
  console.log(`nuxtron v${pkg.version}`);
  process.exit(0);
}

if (args['--help']) {
  console.log(chalk`
    {bold.cyan nuxtron} - ⚡ Electron + Nuxt.js ⚡

    {bold USAGE}

      {bold $} {cyan nuxtron list} --help
      {bold $} {cyan nuxtron list}

    {bold OPTIONS}

      --help,     -h   shows this help message
      --version,  -v   displays the current version of nuxtron
  `);
  process.exit(0);
}

let names = fs.readdirSync(path.resolve(__dirname, '../examples'));
names = names.filter(name => '_template' !== name.toLowerCase() && '.ds_store' !== name.toLowerCase());

console.log(chalk`
  {bold.cyan Available examples (${names.length.toString()}):}
`);

for (let i = 0; i < names.length; i++) {
  console.log(chalk`    {bold - ${names[i]}}`);
}

console.log(chalk`
  {bold USAGE}

    {bold $} {cyan nuxtron init} {underline my-app} [--example {underline example_folder_name}]

  If you want to use "{underline with-typescript}", just type the command below:

    {bold $} nuxtron init my-app --example {underline with-typescript}
`);
