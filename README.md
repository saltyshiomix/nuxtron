<p align="center"><img src="https://i.imgur.com/PTqXTbx.png"></p>
<p align="center">
  <a href="https://www.npmjs.com/package/nuxtron"><img src="https://img.shields.io/npm/v/nuxtron.svg"></a>
  <a href="https://www.npmjs.com/package/nuxtron"><img src="https://img.shields.io/npm/dt/nuxtron.svg"></a>
</p>

Build an [Electron](https://electronjs.org/) + [Nuxt.js](https://nuxtjs.org/) app for speed ⚡

(The screenshot above is a top page of [examples/with-javascript](./examples/with-javascript).)

## Support

| nuxtron | nuxt |
| --- | --- |
| `v0.x` | `v2.x` |

## My Belief for Nuxtron

1. Show a way of developing desktop apps only web knowledge
1. Easy to use
1. Be transparent and open to OSS developers

## Otherwise Specified

- If you need **more** performance with Electron, you should see these boilerplates
  - [szwacz/electron-boilerplate](https://github.com/szwacz/electron-boilerplate)
  - [SimulatedGREG/electron-vue](https://github.com/SimulatedGREG/electron-vue)
- If you want to use Nuxtron as production, please take responsibility for your actions
- But, if you have any troubles, questions or ideas, I'll support you, I promise

## Usage

### Install

```bash
$ npm install --global nuxtron
```

### Create Application

To create `my-app`, just run the command below:

```bash
$ nuxtron init my-app
```

### Create Application with Template

You can use `examples/*` apps as a template.

To create the `examples/with-typescript` app, run the command below:

```bash
$ nuxtron init my-app --example with-typescript
```

### Development Mode

Run `npm run dev`, and nuxtron automatically launches an electron app.

```json
{
  "scripts": {
    "dev": "nuxtron"
  }
}
```

### Production Build

Run `npm run build`, and nuxtron outputs packaged bundles under the `dist` folder.

```json
{
  "scripts": {
    "build": "nuxtron build"
  }
}
```

### Build Options

To build Windows 32 bit version, run `npm run build:win32` like below:

```json
{
  "scripts": {
    "build": "nuxtron build",
    "build:all": "nuxtron build --all",
    "build:win32": "nuxtron build --win --ia32",
    "build:win64": "nuxtron build --win --x64",
    "build:mac": "nuxtron build --mac --x64",
    "build:linux": "nuxtron build --linux"
  }
}
```

**CAUTION**: To build macOS binary, your host machine must be macOS!

### Build Configuration

Edit `electron-builder.yml` properties for custom build configuration.

```yml
appId: com.example.nuxtron
productName: My Nuxtron App
copyright: Copyright © 2019 Shiono Yoshihide
directories:
  output: dist
  buildResources: resources
files:
  - from: .
    filter:
      - package.json
      - app
publish: null
```

For more information, please check out [electron-builder official configuration documents](https://www.electron.build/configuration/configuration/).

## Examples

See [examples](./examples) folder for more information.

Or you can start the example app by `nuxtron init <app-name> --example <example-dirname>`.

To list all examples, just type the command below:

```bash
$ nuxtron list
```

### [examples/custom-build-options](./examples/custom-build-options)

```bash
$ nuxtron init my-app --example custom-build-options
```

### [examples/with-javascript](./examples/with-javascript)

```bash
$ nuxtron init my-app --example with-javascript
```

### [examples/with-typescript](./examples/with-typescript)

```bash
$ nuxtron init my-app --example with-typescript
```

## Develop `examples/*`

```bash
$ git clone https://github.com/saltyshiomix/nuxtron.git
$ cd nuxtron
$ yarn
$ yarn dev <EXAMPLE-FOLDER-NAME>
```

## Related

- [Nextron](https://github.com/saltyshiomix/nextron) - ⚡ Electron + NEXT.js ⚡
