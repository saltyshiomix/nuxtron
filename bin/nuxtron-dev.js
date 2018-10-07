#!/usr/bin/env node
const arg = require('arg')
const chalk = require('chalk')
const delay = require('delay')
const webpack = require('webpack')
const spawn = require('cross-spawn')
const config = require('../build/webpack.main.config')

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '-h': '--help',
  '-v': '--version'
})

if (args['--version']) {
  const pkg = require(resolve(__dirname, '../package.json'))
  console.log(`nuxtron v${pkg.version}`)
  process.exit(0)
}

if (args['--help']) {
  console.log(chalk`
    {bold.cyan nuxtron dev} - Starts the nextron application in development mode

    {bold USAGE}

      {bold $} {cyan nuxtron dev} --help
      {bold $} {cyan nuxtron dev}

    {bold OPTIONS}

      --help, -h     shows this help message
      --version, -v  displays the current version of nuxtron
  `)
  process.exit(0)
}

async function dev() {
  const cwd = process.cwd()

  const startRendererProcess = () => {
    const child = spawn('nuxt', ['-p', '4567', 'renderer'], { cwd, stdio: 'inherit' })
    child.on('close', () => {
      process.exit(0)
    })
    return child
  }

  let watching
  let rendererProcess
  const killWholeProcess = () => {
    if (watching) {
      watching.close()
    }
    if (rendererProcess) {
      rendererProcess.kill()
    }
  }

  process.on('SIGINT', killWholeProcess)
  process.on('SIGTERM', killWholeProcess)
  process.on('exit', killWholeProcess)

  rendererProcess = startRendererProcess()

  // TODO: wait for ready (renderer process)
  await delay(35000)

  let electronStarted = false
  const compiler = webpack(config('development'))
  watching = compiler.watch({}, async (err, stats) => {
    if (!err && !stats.hasErrors() && !electronStarted) {
      electronStarted = true
      await spawn.sync('electron', ['.'], { cwd, stdio: 'inherit' })
    }
  })
}

dev()
