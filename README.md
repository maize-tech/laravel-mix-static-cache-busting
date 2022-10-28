# Laravel Mix Static Cache Busting

<a href="https://www.npmjs.com/package/@maize-tech/laravel-mix-static-cache-busting"><img src="https://img.shields.io/npm/v/@maize-tech/laravel-mix-static-cache-busting.svg" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@maize-tech/laravel-mix-static-cache-busting?minimal=true"><img src="https://img.shields.io/npm/dt/@maize-tech/laravel-mix-static-cache-busting.svg" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@maize-tech/laravel-mix-static-cache-busting"><img src="https://img.shields.io/npm/l/@maize-tech/laravel-mix-static-cache-busting.svg" alt="NPM"></a>

This package allows you to simulate Laravel `mix` function, used for cache busting, without the need to use PHP in your project.

The plugin will grab your static `index.html` file, search for any asset and replace them with all occurrences specified within `mix-manifest.json`.

For example, if your `index.html` file includes this stylesheet reference:

```html
<link rel="stylesheet" type="text/css" href="/app.css">
```

the plugin will automatically replace it during the compilation with:

```html
<link rel="stylesheet" type="text/css" href="/app.css?id=fbd7c81ea490324c303c">
```

### Installation

You can install this package via npm:

```bash
npm i @maize-tech/laravel-mix-static-cache-busting --save-dev
```

### Usage

To use the package, all you need to do is update your `webpack.mix.js` file and add the `staticCacheBusting` method.
The first parameter is the `mix-manifest.json` file path, while the second one is the `index.html` file path.

Here's an example implementation of the method:

```js
let mix = require('laravel-mix');

require('@maize-tech/laravel-mix-static-cache-busting');

mix
  // tasks that will generate a mix-manifest.json
  .staticCacheBusting('./dist/mix-manifest.json', './dist/index.html') // change paths at your discretion
```

### Troubleshooting

The plugin isn't working?
Check the entry attributes in your `mix-manifest.json` and make sure your html `href` attributes follow the same path.

For example, if your `mix-manifest.json` file has this attribute for the `app.css` file:

```json
{
    "/app.css": "/app.css?id=fbd7c81ea490324c303c"
}
```

then your `index.html` should reference the file this way:

```html
<!-- note the slash before app.css -->
<link rel="stylesheet" type="text/css" href="/app.css">
```

while this will **not** work:

```html
<!-- initial slash missing! -->
<link rel="stylesheet" type="text/css" href="app.css">
```

Also, please note that this plugin will replace any entry as-is and anywhere it's placed within the targeted file (index.html).

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Francesco Zaniol](https://github.com/francescozaniol)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
