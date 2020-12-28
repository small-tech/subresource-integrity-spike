# Subresource Integrity Spike

To test:

  - Subresource integrity behaviour on same domain (as it is only documented for cross domain use).
  - Subresource integrity behaviour with ES6 EcmaScript Module (ESM) imports.

## Install

Clone this repository and run:

```
npm install
```

## Usage

Run the server with:

### Passing integrity check

```
npm run passing
```

### Failing integrity check

```
npm run failing
```

## Tested with:

  - Firefox 84.0 (Gecko)
  - Ungoogled Chromium 87.0.4280.88 (Blink)
  - Epiphany 3.28.6 (WebKit)

All tests run on elementary OS 5.1.7.

## Observations

  - Subresource integrity works when script is loaded from the same domain (Gecko, Blink, WebKit)
  - When subresource integrity is specified on a `script` tag, it is also blocked in a subsequent `import` attempt from a separate `script` tag in Gecko and Blink but __not__ in WebKit (at least with the version in Epiphany. Not tested with Safari.)
