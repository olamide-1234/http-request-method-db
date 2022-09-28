/**
 * HTTP Request Methods Database.
 *
 * @example
 * ```json
 * {
 *   "connect": {...},
 *   "get": {
 *     "name": "GET",
 *     "description": "The HTTP GET method requests a representation of the specified resource. Requests using GET should only be used to request data (they shouldn't include data). Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
 *     "note": "Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
 *     "syntax": "GET /index.html",
 *     "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET",
 *     "requestHasBody": false,
 *     "successfulResponseHasBody": true,
 *     "safe": true,
 *     "idempotent": true,
 *     "cacheable": true,
 *     "examples": [],
 *     "specifications": [
 *       {
 *         "name": "HTTP Semantics # GET",
 *         "link": "https://httpwg.org/specs/rfc9110.html#GET"
 *       }
 *     ],
 *     "browserCompatibility": [
 *       {
 *         "name": "Chrome",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Edge",
 *         "supported": true,
 *         "version": "12"
 *       },
 *       {
 *         "name": "Firefox",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Opera",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Safari",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Chrome Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Firefox for Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Opera Android",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Safari on iOS",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "Samsung Internet",
 *         "supported": true,
 *         "version": "Yes"
 *       },
 *       {
 *         "name": "WebView Android",
 *         "supported": true,
 *         "version": "Yes"
 *       }
 *     ]
 *   },
 *   "head": {...},
 *   ...
 * }
 * ```
 */
export interface HTTPRequestMethodDb {
    [key: string]: HTTPRequestMethod;
}
/**
 * HTTP Request Method specification.
 * @example
 * ```json
 * {
 *   "name": "HTTP Semantics # GET",
 *   "link": "https://httpwg.org/specs/rfc9110.html#GET"
 * }
 * ```
 */
export interface HTTPRequestMethodSpecification {
    /**
     * HTTP Request Method specification name.
     */
    name: string;
    /**
     * HTTP Request Method specification documentation link.
     */
    link?: string;
}
/**
 * HTTP Request Method browser info.
 *
 * @example
 * ```json
 * {
 *   "name": "Chrome",
 *   "supported": true,
 *   "version": "65"
 * }
 * ```
 */
export interface HTTPRequestMethodBrowserInfo {
    /**
     * HTTP Request Method browser info name.
     */
    name: string;
    /**
     * HTTP Request Method browser info label version.
     */
    version: string;
    /**
     * If the HTTP Request Method is supported by the browser.
     */
    supported?: boolean;
}
/**
 * HTTP Request Method info
 *
 * @example
 * ```json
 * {
 *   "name": "GET",
 *   "description": "The HTTP GET method requests a representation of the specified resource. Requests using GET should only be used to request data (they shouldn't include data). Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
 *   "note": "Note: Sending body/payload in a GET request may cause some existing implementations to reject the request — while not prohibited by the specification, the semantics are undefined. It is better to just avoid sending payloads in GET requests.",
 *   "syntax": "GET /index.html",
 *   "link": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET",
 *   "requestHasBody": false,
 *   "successfulResponseHasBody": true,
 *   "safe": true,
 *   "idempotent": true,
 *   "cacheable": true,
 *   "examples": [],
 *   "specifications": [
 *     {
 *       "name": "HTTP Semantics # GET",
 *       "link": "https://httpwg.org/specs/rfc9110.html#GET"
 *     }
 *   ],
 *   "browserCompatibility": [
 *     {
 *       "name": "Chrome",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Edge",
 *       "supported": true,
 *       "version": "12"
 *     },
 *     {
 *       "name": "Firefox",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Opera",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Safari",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Chrome Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Firefox for Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Opera Android",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Safari on iOS",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "Samsung Internet",
 *       "supported": true,
 *       "version": "Yes"
 *     },
 *     {
 *       "name": "WebView Android",
 *       "supported": true,
 *       "version": "Yes"
 *     }
 *   ]
 * }
 * ```
 */
export interface HTTPRequestMethod {
    /**
     * HTTP Request Method name.
     */
    name: string;
    /**
     * HTTP Request Method description.
     */
    description?: string;
    /**
     * HTTP Request Method note.
     */
    note?: string;
    /**
     * HTTP Request Method documentation link.
     */
    link?: string;
    /**
     * HTTP Request Method syntax example.
     */
    syntax?: string;
    /**
     * If request has body.
     */
    requestHasBody?: boolean;
    /**
     * If successful response has body.
     */
    successfulResponseHasBody?: boolean;
    /**
     * If the HTTP Request Method is safe.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP | MDN - Safe HTTP}
     */
    safe?: boolean;
    /**
     * If the HTTP Request Method is idempotent.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/Idempotent | MDN - HTTP Method Idempotent}
     */
    idempotent?: boolean;
    /**
     * If the HTTP Request Method is cacheable.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Glossary/cacheable | MDN - HTTP Response Cacheable}
     */
    cacheable?: boolean;
    /**
     * If the HTTP Request Method is allowed in HTML forms.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Learn/Forms | MDN - Web forms}
     */
    allowedInHtmlForms?: boolean;
    /**
     * If set, it represents a warning message for this HTTP Request Method.
     */
    warning?: string;
    /**
     * HTTP Request Method examples.
     */
    examples: string[];
    /**
     * HTTP Request Method specifications.
     */
    specifications: HTTPRequestMethodSpecification[];
    /**
     * HTTP Request Method features browser compatibility list.
     */
    browserCompatibility: HTTPRequestMethodBrowserInfo[];
}
declare const _default: HTTPRequestMethodDb;
export default _default;
