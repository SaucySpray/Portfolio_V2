Boiling Kernel
===========

> A boiling kernel with thin force field using ES6 class & shaders.

## Requirements
You only need <b>node.js</b> pre-installed and you’re good. 

If you don’t want to work with THREE.js, just remove it from the node packages and the webpack config.
```sh
$ npm uninstall three
```

If you don’t use custom shaders, just remove it from the node packages, the webpack config & delete <b>glsl</b> folder.
```sh
$ npm uninstall glslify-loader
$ npm uninstall raw-loader
```

## Setup
Install dependencies
```sh
$ npm install
```

## Development
Run the local webpack-dev-server with hotreload and autocompile on [http://localhost:8080/](http://localhost:8080/)
```sh
$ npm run dev
```

## Deployment
Build the current application
```sh
$ npm run build
```
