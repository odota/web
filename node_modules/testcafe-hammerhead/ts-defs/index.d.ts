interface StaticContent {
    content: string | Buffer,
    contentType: string,
    etag?: string,
    isShadowUIStylesheet?: boolean
}

interface ExternalProxySettingsRaw {
    url: string,
    bypassRules?: string[]
}

interface ExternalProxySettings {
    host: string;
    hostname: string;
    bypassRules?: string[];
    port?: string;
    proxyAuth?: string;
    authHeader?: string;
}

interface Credentials {
    username: string;
    password: string;
    domain?: string;
    workstation?: string;
}

interface RequestTimeout {
    page?: number;
    ajax?: number;
}

interface SessionOptions {
    disablePageCaching: boolean;
    allowMultipleWindows: boolean;
    windowId: string;
    requestTimeout: RequestTimeout;
    nativeAutomation: boolean;
}

interface RequestEventListenerError {
    error: Error;
    methodName: string;
}

interface RequestFilterRuleObjectInitializer {
    url: string | RegExp;
    method: string;
    isAjax: boolean;
}

type RequestFilterRuleOptions = RequestFilterRuleObjectInitializer

interface RequestFilterRuleObjectInitializer {
    url: string | RegExp;
    method: string;
    isAjax: boolean;
}

type RequestFilterRulePredicate = (requestInfo: RequestInfo) => boolean | Promise<boolean>;

declare module 'testcafe-hammerhead' {
    import {
        IncomingHttpHeaders, OutgoingHttpHeaders, IncomingMessage, ServerResponse,
    } from 'http';

    type StrictIncomingMessage = IncomingMessage & { statusCode: number, statusMessage: string };

    export type RequestFilterRuleInit = string | RegExp | Partial<RequestFilterRuleObjectInitializer> | RequestFilterRulePredicate;

    enum RequestEventNames {
        onRequest = 'onRequest',
        onConfigureResponse = 'onConfigureResponse',
        onResponse = 'onResponse'
    }

    export interface RequestEventListenersData {
        listeners: RequestEventListeners;
        errorHandler: (event: RequestEventListenerError) => void;
        rule: RequestFilterRule;
    }

    interface RequestEventListeners {
        [RequestEventNames.onRequest]: Function;
        [RequestEventNames.onConfigureResponse]: Function;
        [RequestEventNames.onResponse]: Function;
    }

    interface UserScript {
        url: string;
        page: RequestFilterRule;
    }

    interface InjectableResources {
        scripts: string[];
        styles: string[];
        userScripts: UserScript[];
    }

    interface StoragesSnapshot {
        localStorage: string;
        sessionStorage: string;
    }

    interface ExternalCookies {
        name?: string;
        value?: string;
        domain?: string;
        path?: string;
        expires?: Date;
        maxAge?: number | 'Infinity' | '-Infinity';
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: string;
    }

    interface Cookies {
        getCookies (externalCookies: ExternalCookies[], urls: string[]): Promise<ExternalCookies[]>;

        setCookies (externalCookies: ExternalCookies[], url: string): Promise<void>;

        deleteCookies (externalCookies: ExternalCookies[], urls: string[]): Promise<void>;

        getHeader({ url, hostname }: { url: string, hostname: string }): string | null;

        copySyncCookies (syncCookie: string, toUrl: string): void;
    }

    /** Initialization options for the IncomingMessageLike object **/
    export interface IncomingMessageLikeInitOptions {
        headers: { [name: string]: string|string[] };
        trailers: { [key: string]: string | undefined };
        statusCode: number;
        body: object|string|Buffer|null;
    }

    interface ResponseMockSetBodyMethod {
        add(res: IncomingMessageLikeInitOptions): void;
        remove(res: IncomingMessageLikeInitOptions): void;
    }

    interface ContentTypeUtils {
        isPage (header: string): boolean;
        isTextPage (contentTypeHeader: string): boolean;
        isCSSResource (contentTypeHeader: string, acceptHeader: string): boolean;
        isScriptResource (contentTypeHeader: string, acceptHeader: string): boolean;
        isManifest (contentTypeHeader: string): boolean;
}

    export interface RequestOptionsParams {
        method: string;
        url: string;
        protocol: string;
        hostname: string;
        host: string;
        port?: string | void;
        path: string;
        auth?: string | void;
        headers: OutgoingHttpHeaders;
        externalProxySettings?: ExternalProxySettings;
        credentials?: Credentials;
        body: Buffer;
        isAjax?: boolean;
        rawHeaders?: string[];
        requestId?: string;
        requestTimeout?: RequestTimeout;
        isWebSocket?: boolean;
        disableHttp2?: boolean;
    }

    interface ParsedUrl {
        protocol?: string;
        host?: string;
        hostname?: string;
        port?: string;
        partAfterHost?: string;
        auth?: string;
    }

    interface ParsedProxyUrl {
        destUrl: string;
        destResourceInfo: ParsedUrl;
        partAfterHost: string;
        sessionId: string;
        resourceType: string;
        charset?: string;
        reqOrigin?: string;
        windowId?: string;
        credentials?: number,
        proxy: {
            hostname: string;
            port: string;
        };
    }

    export interface PageInjectableResources {
        stylesheets: string[];
        scripts: string[];
        embeddedScripts: string[];
        userScripts?: string[];
    }

    export interface PageRestoreStoragesOptions {
        host: string;
        sessionId: string;
    }

    export interface ServerInfo {
        hostname: string;
        port: number;
        crossDomainPort: number;
        protocol: string;
        domain: string;
        cacheRequests: boolean;
    }

    export interface RouterOptions {
        staticContentCaching?: object;
    }

    export interface ProxyOptions {
        hostname: string;
        port1: number;
        port2: number;
        ssl?: object;
        developmentMode?: boolean;
        cache?: boolean;
        disableHttp2?: boolean;
        nativeAutomation?: boolean;
    }

    export interface OnResponseEventData {
        rule: RequestFilterRule;
        opts: ConfigureResponseEventOptions;
    }

    export interface ModifyResponseFunctions {
        setHeader: (name: string, value: string) => void;
        removeHeader: (name: string) => void;
    }

    /** Base class for emitting request hook events **/
    export class RequestHookEventProvider {
        /** Adds request event listeners **/
        addRequestEventListeners (rule: RequestFilterRule, listeners: RequestEventListeners, errorHandler: (event: RequestEventListenerError) => void): Promise<void>;

        /** Removes request event listeners **/
        removeRequestEventListeners (rule: RequestFilterRule): Promise<void>;

        /** Remove request event listeners for all request filter rules **/
        clearRequestEventListeners(): void;

        /** Returns whether provider has request event listeners **/
        hasRequestEventListeners (): boolean;

        requestEventListeners: Map<string, RequestEventListenersData>;
    }

    /** The Session class is used to create a web-proxy session **/
    export abstract class Session extends RequestHookEventProvider {
        /** Unique identifier of the Session instance **/
        id: string;

        /** Session's injectable resources **/
        injectable: InjectableResources;

        /** Session's cookie API **/
        cookies: Cookies;

        /** Contains all infrastructure for emitting request events **/
        requestHookEventProvider: RequestHookEventProvider;

        /** Creates a session instance **/
        protected constructor (uploadRoots: string[], options: Partial<SessionOptions>)

        /** Abstract method that must return a payload script for iframe **/
        abstract getIframePayloadScript (iframeWithoutSrc: boolean): Promise<string>;

        /** Abstract method that must return a payload script **/
        abstract getPayloadScript (): Promise<string>;

        /** Abstract method that must handle a file download **/
        abstract handleFileDownload (): void;

        /** Apply the cookie, sessionStorage and localStorage snapshot to the session **/
        useStateSnapshot (snapshot: StateSnapshot): void;

        /** Get the cookie, sessionStorage and localStorage snapshot of current session **/
        getStateSnapshot (): Promise<StateSnapshot> | StateSnapshot;

        /** Generates main hammerhead starting script **/
        // getTaskScript (options: TaskScriptOpts): Promise<string>;

        /** Set RequestMock on the specified ResponseEvent event **/
        setMock (responseEventId: string, mock: ResponseMock): Promise<void>;

        /** Set ConfigureResponseEvent options which are applied during the request pipeline execution**/
        setConfigureResponseEventOptions (eventId: string, opts: ConfigureResponseEventOptions): Promise<void>;

        /** Change the header on the specified ConfigureResponseEvent **/
        setHeaderOnConfigureResponseEvent (eventId: string, headerName: string, headerValue: string): Promise<void>;

        /** Remove the header on the specified ConfigureResponseEvent **/
        removeHeaderOnConfigureResponseEvent (eventId: string, headerName: string): Promise<void>;

        /** Check disabling http2 **/
        isHttp2Disabled (): boolean;
    }

    /** The Proxy class is used to create a web-proxy **/
    export class Proxy {
        /** Creates a web proxy instance **/
        constructor (options: RouterOptions);

        /** Information about server1 **/
        server1Info: ServerInfo;
        /** Information about server2 **/
        server2Info: ServerInfo;

        /** Start the proxy instance **/
        start (options: ProxyOptions): void;

        /**  Close the proxy instance */
        close (): void;

        /** Opens a new test run session **/
        openSession(url: string, session: Session, externalProxySettings: ExternalProxySettingsRaw): string;

        /** Closes the specified test run session **/
        closeSession (session: Session): void;

        /** Register a new route for the GET HTTP method **/
        GET (route: string, handler: StaticContent | Function): void;

        /** Register a new route for the POST HTTP method **/
        POST (route: string, handler: StaticContent | Function): void;

        /** Unregister the route **/
        unRegisterRoute (route: string, method: string): void;

        /** Resolve relative service url **/
        resolveRelativeServiceUrl (relativeServiceUrl: string, domain?: string): string;

        /** Switch proxy to the nativeAutomation mode **/
        switchToNativeAutomation (): void;

        /** Set proxy mode **/
        setMode (isNativeAutomation: boolean): void;
    }

    /** The RequestFilterRule class is used to create URL filtering rules for request hook **/
    export class RequestFilterRule {
        /** Creates a request filter rule instance **/
        constructor (options: RequestFilterRuleInit);

        /** Prepared request filter rule options **/
        options: (requestInfo: RequestInfo) => Promise<boolean> | RequestFilterRuleOptions;

        /** Returns the value that accepts any request  **/
        static ANY: RequestFilterRule;

        /** Check whether the specified RequestFilterRule instance accepts any request **/
        static isANY (instance: any): boolean;

        /** Creates a RequestFilterRule instance from the RequestFilterRule initializer **/
        static from (rule?: RequestFilterRuleInit): RequestFilterRule;

        /** Creates RequestFilterRule instances from RequestFilterRule initializers **/
        static fromArray (rules?: RequestFilterRuleInit | RequestFilterRuleInit[]): RequestFilterRule[];

        /** Unique identifier of the RequestFilterRule instance **/
        id: string;

        /** Indicates that request filter rule defines as a function **/
        isPredicate: boolean;
    }

    /** The StateSnapshot class is used to create page state snapshot **/
    export class StateSnapshot {
        constructor (cookies: string | null, storages: StoragesSnapshot | null);

        /** Creates a empty page state snapshot **/
        static empty (): StateSnapshot;

        /** The cookie part of snapshot **/
        cookies: string;

        /** The storages part of snapshot **/
        storages: StoragesSnapshot;
    }

    /** The ConfigureResponseEventOptions contains options to set up ResponseEvent **/
    export class ConfigureResponseEventOptions {
        /** Creates an instance of ConfigureResponseEventOptions **/
        constructor(includeHeaders: boolean, includeBody: boolean);

        /** Specified whether to include headers to ResponseEvent **/
        includeHeaders: boolean;

        /** Specified whether to include body to Response **/
        includeBody: boolean;
    }

    /** The ConfigureResponseEvent is used to set up the ResponseEvent **/
    export class ConfigureResponseEvent {
        /** The unique identifier of the event **/
        id: string;

        /** The options to configure ResponseEvent **/
        opts: ConfigureResponseEventOptions;

        /** RequestFilterRule associated with event **/
        requestFilterRule: RequestFilterRule;

        /** Creates an instance of ConfigureResponseEvent **/
        constructor (requestFilterRule: RequestFilterRule, modifyResponseFunctions: ModifyResponseFunctions | null, opts?: ConfigureResponseEventOptions);

        /** Set header of the result response **/
        setHeader(name: string, value: string): Promise<void>;

        /** Remove header from result response **/
        removeHeader (name: string): Promise<void>;

        /** Creates a new ConfigureResponseEvent using the passed data **/
        static from (data: unknown): ConfigureResponseEvent;
    }

    /** The RequestInfo class contains information about query request **/
    export class RequestInfo {
        /** Creates a RequestInfo instance **/
        constructor(init: RequestInfo);

        /** Request unique identifier **/
        requestId: string;

        /** Session unique identifier **/
        sessionId: string;

        /** The user agent of the query request **/
        userAgent: string;

        /** The url of the query request **/
        url: string;

        /** The method of the query request **/
        method: string;

        /** The headers of the query request **/
        headers: IncomingHttpHeaders;

        /** The body of the query request **/
        body: Buffer;

        /** Determines whether the request is xhr or fetch request **/
        isAjax: boolean;

        static getUserAgent(headers: any): string;
    }

    /** The RequestEvent describes the request part of the query captured with request hook **/
    export class RequestEvent {
        /** The unique identifier of the event **/
        id: string;

        /** The information of the query request **/
        _requestInfo: RequestInfo;

        /** The filter rule for the query **/
        requestFilterRule: RequestFilterRule;

        /** Set up the mock for the query response **/
        setMock(mock: ResponseMock): Promise<void>;

        /** Creates a new RequestEvent using the passed data **/
        static from (data: unknown): RequestEvent;
    }

    /** The ResponseInfo class is necessary for construction ResponseEvent class **/
    export class ResponseInfo {
        requestId: string;
        statusCode: number;
        sessionId: string;
        headers: OutgoingHttpHeaders;
        body: Buffer;
        isSameOriginPolicyFailed: boolean;

        constructor (init: ResponseInfo);
    }

    /** The ResponseEvent describes the response part of the query captured with request hook **/
    export class ResponseEvent {
        /** The unique identifier of the event **/
        id: string;

        /** The filter rule for the query **/
        requestFilterRule: RequestFilterRule;

        /** Request unique identifier **/
        requestId: string;

        /** The status code of the query **/
        statusCode: number;

        /** The headers of the query response **/
        headers: IncomingHttpHeaders;

        /** The body of the query response **/
        body: Buffer;

        /** The same origin policy check **/
        isSameOriginPolicyFailed: boolean;

        /** Creates a new ResponseEvent using the passed data **/
        static from (data: unknown): ResponseEvent;
    }

    /** The ResponseMock class is used to construct the response of the mocked request **/
    export class ResponseMock {
        /** Creates a ResponseMock instance **/
        constructor(body: string | Function, statusCode?: number, headers?: object);

        /** Creates an ResponseMock instance from object **/
        static from (val: object): ResponseMock;

        /** The unique identifier of the response mock **/
        id: string;

        /** Indicates that response defines as a function **/
        isPredicate: boolean;

        /** The body of the response mock **/
        body:string | Function;

        /** Determine whether an error occurs on calculation response **/
        hasError: boolean;

        /** An error occurs on calculation response **/
        error: Error | null;
    }

    /** RequestHookMethodError raises on error occurred during request hook method execution **/
    export class RequestHookMethodError {
        /** The origin error **/
        error: Error;

        /** The executed request hook method name **/
        methodName: string;
    }

    /** The RequestOptions class is used to construct the request options **/
    export class RequestOptions {
        /** Request url **/
        url: string;

        /** Request method **/
        method: string;

        /** Request headers **/
        headers: OutgoingHttpHeaders;

        /** Determines whether the request is xhr or fetch request **/
        isAjax: boolean;

        /** Creates a RequestOptions instance **/
        constructor (params: RequestOptionsParams, trackChanges?: boolean);
    }

    /** The ResponseMock class is used to send request **/
    export class DestinationRequest {
        /** Creates a DestinationRequest instance **/
        constructor (opts: RequestOptions, cache?: boolean);

        /** Response event **/
        on(event: 'response', listener: (res: StrictIncomingMessage) => void): this;

        /** Error event **/
        on(event: 'error', listener: (err: Error) => void): this;

        /** Fatal error event **/
        on(event: 'fatalError', listener: (err: string) => void): this;
    }

    /** Generates an URL friendly string identifier **/
    export function generateUniqueId(length?: number): string;

    /** Inject into specified text the service scripts instructions **/
    export function processScript(src: string, withHeader?: boolean, wrapLastExprWithProcessHtml?: boolean, resolver?: Function): string;

    /** Check whether specified code contains the service script instructions **/
    export function isScriptProcessed (code: string): boolean;

    /** The URL of the service blank page **/
    export const SPECIAL_BLANK_PAGE: string;

    /** The URL of the service error page **/
    export const SPECIAL_ERROR_PAGE: string;

    /** The set of utility methods to manipulate with ResponseMock.setBody method **/
    export const responseMockSetBodyMethod: ResponseMockSetBodyMethod;

    export const contentTypeUtils: ContentTypeUtils;

    /** Promisify steam **/
    export function promisifyStream(s: NodeJS.ReadableStream, contentLength?: string): Promise<Buffer>;

    /** Parse proxy url **/
    export function parseProxyUrl(url: string): ParsedProxyUrl;

    /** Check checkedUrl has the same origin with location **/
    export function sameOriginCheck(location: string, checkedUrl: string): boolean;

    /** Inject specified stuff to the page **/
    export function injectResources (html: string, resources: PageInjectableResources, options?: PageRestoreStoragesOptions): string;

    /** Prepare form post data **/
    export function injectUpload (contentTypeHeader: string|void, body: Buffer): Buffer | null;

    /** Proxy injectable scripts **/
    export const INJECTABLE_SCRIPTS: string[];

    /** Extract String from Buffer **/
    export function decodeBufferToString (content: Buffer, contentType: string): string;
    
    /** Convert String to Buffer **/
    export function encodeStringToBuffer (content: string, contentType: string): Buffer;

    /** Allows to accept cross-origin request for proxy routes **/
    function acceptCrossOrigin (res: ServerResponse): void;

    /** Calculates the asset path depending on the run mode (production or development) **/
    function getAssetPath(originPath: string, developmentMode: boolean): string;

    /** Return whether the HTTP status code is a redirect status code **/
    function isRedirectStatusCode (code?: number): boolean;

    /**  **/
    export class IncomingMessageLike {
        /** The headers of the instance **/
        headers: IncomingHttpHeaders;
        /** The trailers of the instance **/
        trailers: { [key: string]: string | undefined };
        /** The status code of the instance **/
        statusCode: number;

        /** Get body **/
        getBody (): Buffer | null;
    }

    /** Base class for creating event classes for request hook events **/
    export abstract class BaseRequestHookEventFactory {
        /** Creates a new RequestInfo instance **/
        public abstract createRequestInfo (): RequestInfo;

        /** Creates a new RequestEvent instance **/
        public abstract createRequestOptions (): RequestOptions;

        /** Creates a new ConfigureResponseEvent instance **/
        public abstract createConfigureResponseEvent (rule: RequestFilterRule): ConfigureResponseEvent;

        /** Create a new ResponseInfo instance **/
        public abstract createResponseInfo (): ResponseInfo;
    }

    /** Base class for building request pipeline contexts **/
    export abstract class BaseRequestPipelineContext {
        /** Returns a mock associated with the current context **/
        mock: ResponseMock;

        /** Returns request options associated with the current context **/
        reqOpts: RequestOptions;

        protected constructor (requestId: string);

        /** Request filter rules associated with the request **/
        requestFilterRules: RequestFilterRule[];

        /** Request identifier **/
        requestId: string;

        /** Information for generating the response events **/
        onResponseEventData: OnResponseEventData[];

        /** The target injectable user scripts **/
        injectableUserScripts: string[];

        /** Set request options for the current context **/
        setRequestOptions (eventFactory: BaseRequestHookEventFactory): void;

        /** Raise onRequest event **/
        onRequestHookRequest (eventProvider: RequestHookEventProvider, eventFactory: BaseRequestHookEventFactory): Promise<void>;

        /** Raise onConfigureResponse event **/
        onRequestHookConfigureResponse (eventProvider: RequestHookEventProvider, eventFactory: BaseRequestHookEventFactory): Promise<void[]>;

        /** Raise onResponse event **/
        onRequestHookResponse (eventProvider: RequestHookEventProvider, eventFactory: BaseRequestHookEventFactory, rule: RequestFilterRule, opts: ConfigureResponseEventOptions): Promise<ResponseEvent>;

        /** Get mock response **/
        getMockResponse (): Promise<IncomingMessageLike>;

        /** Handle mock error **/
        handleMockError (eventProvider: RequestHookEventProvider): Promise<void>;

        /** Get OnResponseEventData depending on specified filter **/
        getOnResponseEventData ({ includeBody }: { includeBody: boolean }): OnResponseEventData[];

        /** Prepare the target injectable user scripts for the current route **/
        prepareInjectableUserScripts (eventFactory: BaseRequestHookEventFactory, userScripts: UserScript[]): Promise<void>;
    }
}
