Boiling Kernel
===========

> My "under development" portfolio. Currently only available on desktop.

## Features
⋅⋅* Shader animated geaometry intro
⋅⋅* Side menu
⋅⋅* 3 main parts
⋅⋅* Some of my projects

## Requirements
You only need <b>node.js</b> pre-installed and you’re good. 

If you don’t want to work with THREE.js, just remove it from the node packages and the webpack config.
```sh
$ npm uninstall three
```
All the code linked to THREE.js is located in **_/src/js/Animation.js_**

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

## Thanks
I would like to thank [Jaume Sanchez Elias](https://twitter.com/thespite) for all his good tutorials, and [Bruno Simon](https://bruno-simon.com/) for the rich and intensive learning this year. I'm pleased to have learn so much in a short period.

Obviously, this portfolio is not finished, but it will be used as an excuse to learn new front-end skills, and maybe someday I will finish it!