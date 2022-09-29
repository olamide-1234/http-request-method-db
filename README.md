<div align="center">

# HTTP Request Method Database

[![NPM](https://nodei.co/npm/http-request-method-db.png?compact=true)](https://nodei.co/npm/http-request-method-db/)
<br />
[![](https://img.shields.io/npm/dt/http-request-method-db.svg?style=flat-square)](https://www.npmjs.com/package/http-request-method-db)

</div>

[![NPM Version](https://badgen.net/npm/v/http-request-method-db)](https://npmjs.org/package/http-request-method-db)
[![license](https://img.shields.io/github/license/pichillilorenzo/http-request-method-db)](/LICENSE)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/LorenzoPichilli)

This is a database of known HTTP Request Methods and information about them. It consists of a single, public JSON file and does not include any logic, allowing it to remain as un-opinionated as possible with an API. It aggregates data from the following sources:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- https://www.iana.org/assignments/http-methods/http-methods.xhtml

## Installation

```bash
npm i --save http-request-method-db
```

### Database Download

If you want download the database and use it directly in the browser, you can just grab the
JSON file using [jsDelivr](https://www.jsdelivr.com/). It is recommended to
replace `main` with [a release tag](https://github.com/pichillilorenzo/http-request-method-db/tags)
as the JSON format may change in the future.

```
https://cdn.jsdelivr.net/gh/pichillilorenzo/http-request-method-db@main/dist/db.json
```

## Usage

```js
import db from 'http-request-method-db';
// .. or
const db = require('http-request-method-db').default;

const getInfo = db['get']; // An instance of HTTPRequestMethod
console.log(getInfo.syntax); // GET /index.html
```

Access HTTP Request Method info using the request method name in **lower case** as key.

## Contributing

The primary way to contribute to this database is by updating the data in one of the upstream sources.
Check the `scripts/src/mdn-scraper.ts` to check the MDN scraper implementation.

### Direct Inclusion

If that is not possible / feasible, they can be added directly here as a "custom" request method.

To edit the database, only make PRs against `scripts/src/custom-request-methods.json`.

The `scripts/src/custom-request-methods.json` file is a JSON object of type [HTTPRequestMethodDb](https://pichillilorenzo.github.io/http-request-method-db/interfaces/HTTPRequestMethodDb.html), where each `key` is the request method name in lower case and the `value`
is an Object of type [HTTPRequestMethod](https://pichillilorenzo.github.io/http-request-method-db/interfaces/HTTPRequestMethod.html).

To update the build, run `npm run build:all`.

## HTTPRequestMethodDb Data Structure Example

```json
{
  "connect": {...},
  "get": {
    "name": "GET",
    "description": "The HTTP GET method requests a representation of the specified resource. Requests using GET should only be used to request data (they shouldn't include data). Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
    "note": "Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
    "syntax": "GET /index.html",
    "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET",
    "requestHasBody": false,
    "successfulResponseHasBody": true,
    "safe": true,
    "idempotent": true,
    "cacheable": true,
    "examples": [],
    "specifications": [
      {
        "name": "HTTP Semantics # GET",
        "link": "https://httpwg.org/specs/rfc9110.html#GET"
      }
    ],
    "browserCompatibility": [
      {
        "name": "Chrome",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Edge",
        "supported": true,
        "version": "12"
      },
      {
        "name": "Firefox",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Opera",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Safari",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Chrome Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Firefox for Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Opera Android",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Safari on iOS",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "Samsung Internet",
        "supported": true,
        "version": "Yes"
      },
      {
        "name": "WebView Android",
        "supported": true,
        "version": "Yes"
      }
    ]
  },
  "head": {...},
  ...
}
```

Check [HTTPRequestMethodDb](https://pichillilorenzo.github.io/http-request-method-db/interfaces/HTTPRequestMethodDb.html) for more details.

## License

Released under the [ISC](/LICENSE) license.

This project is strongly inspired by the [mime-db](https://github.com/jshttp/mime-db).
