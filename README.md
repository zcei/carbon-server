Carbon Server
===============

> Programmatic endpoint to [Carbon](https://github.com/dawnlabs/carbon)

## Install

**Local**

```sh
$ npm install
$ npm start
```

**Docker**

```sh
$ npm run build
$ npm run serve
```

## Usage
```sh
$ curl \
  -X POST \
  -d 'const foo = bar' \
  http://localhost:3000/
```

## API

Currently a custom fork of Carbon is used, which allows specifying settings via query string parameters:

| Setting          | Query String | Value     |
|------------------|--------------|-----------|
| `background`     | `bg`         | hex color |
| `windowControls` | `wc`         | boolean   |
| ...              | ...          | ...       |

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/zcei/carbon-server/issues/new).
