# simple-spa

This library adds single-page-application feature into your website.

The main class is `Spa`. `LocalStorageCache` is a cache implementation.
You can add your own cache implementation.
If you want to know what options are available for Spa or how you can create your own cache look at `src/types.d.ts`.

## Install 

```
npm i @janmarkuslanger/simple-spa --save
```

## Usage


``` js 
import { Spa, LocalStorageCache } from "@janmarkuslanger/simple-spa";

const myCache = new LocalStorageCache();

const mySpa = new Spa({
    cache: myCache
});

document.querySelector('.test').addEventListener('click', () => {
    mySpa.load('/other-page')
});
```

Main page. Click on Button will load the other page in the background and the new content will be replaced.

``` html
<h1 data-simple-spa="a">Main content</h1>
<button class="test">Click me </button>
```

``` html
<h1 data-simple-spa="a">New Content</h1>
```


## Development

### Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

#### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

#### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.
