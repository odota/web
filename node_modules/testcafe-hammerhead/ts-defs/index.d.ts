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

interface RequestTimeout {
    page?: number;
    ajax?: number;
}

interface SessionOptions {
    disablePageCaching: boolean;
    allowMultipleWindows: boolean;
    windowId: string;
    requestTimeout: RequestTimeout;
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

interface RequestFilterRuleOptions extends RequestFilterRuleObjectInitializer {}

type RequestFilterRuleInit = string | RegExp | Partial<RequestFilterRuleObjectInitializer> | RequestFilterRulePredicate;

interface RequestFilterRuleObjectInitializer {
    url: string | RegExp;
    method: string;
    isAjax: boolean;
}

type RequestFilterRulePredicate = (requestInfo: RequestInfo) => boolean | Promise<boolean>;

declare module 'testcafe-hammerhead' {
    import { IncomingHttpHeaders } from 'http';

    export type RequestFilterRuleInit = string | RegExp | Partial<RequestFilterRuleObjectInitializer> | RequestFilterRulePredicate;

    enum RequestEventNames {
        onRequest = 'onRequest',
        onConfigureResponse = 'onConfigureResponse',
        onResponse = 'onResponse'
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
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: Date;
        maxAge: number | 'Infinity' | '-Infinity';
        secure: boolean;
        httpOnly: boolean;
        sameSite: string;
    }

    interface Cookies {
        getCookies (externalCookies: ExternalCookies[], urls: string[]): Promise<ExternalCookies[]>;

        setCookies (externalCookies: ExternalCookies[], url: string): Promise<void>;

        deleteCookies (externalCookies: ExternalCookies[], urls: string[]): Promise<void>;
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

    /** The Session class is used to create a web-proxy session **/
    export abstract class Session {
        /** Unique identifier of the Session instance **/
        id: string;

        /** Session's injectable resources **/
        injectable: InjectableResources;

        /** Session's cookie API **/
        cookies: Cookies;

        /** Creates a session instance **/
        protected constructor (uploadRoots: string[], options: Partial<SessionOptions>)

        /** Abstract method that must return a payload script for iframe **/
        abstract getIframePayloadScript (iframeWithoutSrc: boolean): Promise<string>;

        /** Abstract method that must return a payload script **/
        abstract getPayloadScript (): Promise<string>;

        /** Abstract method that must handle a file download **/
        abstract handleFileDownload (): void;

        /** Adds request event listeners **/
        addRequestEventListeners (rule: RequestFilterRule, listeners: RequestEventListeners,
                                  errorHandler: (event: RequestEventListenerError) => void): void;

        /** Removes request event listeners **/
        removeRequestEventListeners (rule: RequestFilterRule): void;

        /** Remove request event listeners for all request filter rules **/
        clearRequestEventListeners(): void;

        /** Apply the cookie, sessionStorage and localStorage snapshot to the session **/
        useStateSnapshot (snapshot: StateSnapshot): void;

        /** Get the cookie, sessionStorage and localStorage snapshot of current session **/
        getStateSnapshot (): StateSnapshot;

        /** Set RequestMock on the specified ResponseEvent event **/
        setMock (responseEventId: string, mock: ResponseMock): Promise<void>;

        /** Set ConfigureResponseEvent options which are applied during the request pipeline execution**/
        setConfigureResponseEventOptions (eventId: string, opts: ConfigureResponseEventOptions): Promise<void>;

        /** Change the header on the specified ConfigureResponseEvent **/
        setHeaderOnConfigureResponseEvent (eventId: string, headerName: string, headerValue: string): Promise<void>;

        /** Remove the header on the specified ConfigureResponseEvent **/
        removeHeaderOnConfigureResponseEvent (eventId: string, headerName: string): Promise<void>;
    }

    /** The Proxy class is used to create a web-proxy **/
    export class Proxy {
        /** Creates a web proxy instance **/
        constructor ();

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

        /** Set header of the result response **/
        setHeader(name: string, value: string): Promise<void>;

        /** Remove header from result response **/
        removeHeader (name: string): Promise<void>;

        /** Creates a new ConfigureResponseEvent using the passed data **/
        static from (data: unknown): ConfigureResponseEvent;
    }

    /** The RequestInfo class contains information about query request **/
    export class RequestInfo {
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
    }

    /** RequestHookMethodError raises on error occurred during request hook method execution **/
    export class RequestHookMethodError {
        /** The origin error **/
        error: Error;

        /** The executed request hook method name **/
        methodName: string;
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
}
