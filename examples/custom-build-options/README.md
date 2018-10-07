# custom-build-options

## Usage

```bash
$ nuxtron init my-app --template custom-build-options

$ cd my-app

# Install dependencies
$ yarn (or `npm install`)

# Run development mode
$ yarn dev (or `npm run dev`)

# Build packages
$ yarn build (or `npm run build`)

# Build packages for all platform
$ yarn build:all (or `npm run build:all`)

# Build packages for windows 32 bit
$ yarn build:win (or `npm run build:win`)

# Build packages for macOS 64 bit
$ yarn build:mac (or `npm run build:mac`)

# Build packages for Linux
$ yarn build:linux (or `npm run build:linux`)
```

**package.json**

```json
{
  "scripts": {
    "dev": "nuxtron",
    "build": "nuxtron build",
    "build:all": "nuxtron build --all",
    "build:win": "nuxtron build --win --ia32",
    "build:mac": "nuxtron build --mac --x64",
    "build:linux": "nuxtron build --linux"
  },
  "dependencies": {
    "nuxtron": "latest"
  },
  "devDependencies": {
    "electron": "3.0.2",
    "electron-builder": "20.28.4"
  }
}
```
