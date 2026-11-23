/**
 * Represents the name of an AI coding agent.
 */
type AgentName = (string & {}) | "cursor" | "claude" | "copilot" | "devin" | "replit" | "gemini" | "codex" | "auggie" | "opencode" | "kiro" | "goose" | "pi" | "junie";
/**
 * Provides information about an AI coding agent.
 */
type AgentInfo = {
  /**
   * The name of the AI coding agent. See {@link AgentName} for possible values.
   */
  name?: AgentName;
};
/**
 * Detects the current AI coding agent from environment variables.
 *
 * Supported agents: `cursor`, `claude`, `copilot`, `devin`, `replit`, `gemini`, `codex`, `auggie`, `opencode`, `kiro`, `goose`, `pi`, `junie`
 *
 * You can also set the `AI_AGENT` environment variable to explicitly specify the agent name.
 */
export declare function detectAgent(): AgentInfo;
/**
 * The detected agent information for the current execution context.
 * This value is evaluated once at module initialisation.
 */
export declare const agentInfo: AgentInfo;
/**
 * Name of the detected agent.
 */
export declare const agent: AgentName | undefined;
/**
 * A boolean flag indicating whether the current environment is running inside an AI coding agent.
 */
export declare const isAgent: boolean;
/**
 * Runtime-agnostic reference to environment variables.
 *
 * Resolves to `globalThis.process.env` when available, otherwise an empty object.
 */
export declare const env: Record<string, string | undefined>;
/**
 * Runtime-agnostic reference to the `process` global.
 *
 * Resolves to `globalThis.process` when available, otherwise a minimal shim containing only `env`.
 */
export declare const process: Partial<typeof globalThis.process>;
/**
 * Current value of the `NODE_ENV` environment variable (or static value if replaced during build).
 *
 * If `NODE_ENV` is not set, this will be undefined.
 */
export declare const nodeENV: string | undefined;
/** Value of process.platform */
export declare const platform: string;
/** Detect if `CI` environment variable is set or a provider CI detected */
export declare const isCI: boolean;
/** Detect if stdout.TTY is available */
export declare const hasTTY: boolean;
/** Detect if global `window` object is available */
export declare const hasWindow: boolean;
/** Detect if `DEBUG` environment variable is set */
export declare const isDebug: boolean;
/** Detect if `NODE_ENV` environment variable is `test` or `TEST` environment variable is set */
export declare const isTest: boolean;
/** Detect if `NODE_ENV` or `MODE` environment variable is `production` */
export declare const isProduction: boolean;
/** Detect if `NODE_ENV` environment variable is `dev` or `development`, or if `MODE` environment variable is `development` */
export declare const isDevelopment: boolean;
/** Detect if MINIMAL environment variable is set, running in CI or test or TTY is unavailable */
export declare const isMinimal: boolean;
/** Detect if process.platform is Windows */
export declare const isWindows: boolean;
/** Detect if process.platform is Linux */
export declare const isLinux: boolean;
/** Detect if process.platform is macOS (darwin kernel) */
export declare const isMacOS: boolean;
/** Detect if terminal color output is supported based on `NO_COLOR`, `FORCE_COLOR`, TTY, and CI environment */
export declare const isColorSupported: boolean;
/** Node.js version string (e.g. `"20.11.0"`), or `null` if not running in Node.js */
export declare const nodeVersion: string | null;
/** Node.js major version number (e.g. `20`), or `null` if not running in Node.js */
export declare const nodeMajorVersion: number | null;
/**
 * Represents the name of a CI/CD or Deployment provider.
 */
type ProviderName = (string & {}) | "appveyor" | "aws_amplify" | "azure_pipelines" | "azure_static" | "appcircle" | "bamboo" | "bitbucket" | "bitrise" | "buddy" | "buildkite" | "circle" | "cirrus" | "cloudflare_pages" | "cloudflare_workers" | "google_cloudrun" | "google_cloudrun_job" | "codebuild" | "codefresh" | "drone" | "drone" | "dsari" | "github_actions" | "gitlab" | "gocd" | "layerci" | "hudson" | "jenkins" | "magnum" | "netlify" | "nevercode" | "render" | "sail" | "semaphore" | "screwdriver" | "shippable" | "solano" | "strider" | "teamcity" | "travis" | "vercel" | "appcenter" | "codesandbox" | "stackblitz" | "stormkit" | "cleavr" | "zeabur" | "codesphere" | "railway" | "deno-deploy" | "firebase_app_hosting" | "edgeone_pages";
/**
 * Provides information about a CI/CD or Deployment provider, including its name and possibly other metadata.
 */
type ProviderInfo = {
  /**
   * The name of the CI/CD or Deployment provider. See {@link ProviderName} for possible values.
   */
  name: ProviderName;
  /**
   * If is set to `true`, the environment is recognised as a CI/CD provider.
   */
  ci?: boolean;
  /**
   * Arbitrary metadata associated with the provider.
   */
  [meta: string]: any;
};
/**
 * Detects the current CI/CD or Deployment provider from environment variables.
 */
export declare function detectProvider(): ProviderInfo;
/**
 * The detected provider information for the current execution context.
 * This value is evaluated once at module initialisation.
 */
export declare const providerInfo: ProviderInfo;
/**
 * Name of the detected provider, defaults to an empty string if no provider is detected.
 */
export declare const provider: ProviderName;
/**
 * Represents the name of a JavaScript runtime.
 *
 * @see https://runtime-keys.proposal.wintercg.org/
 */
type RuntimeName = (string & {}) | "workerd" | "deno" | "netlify" | "node" | "bun" | "edge-light" | "fastly";
type RuntimeInfo = {
  /**
   * The name of the detected runtime.
   */
  name: RuntimeName;
};
/**
 * Indicates if running in Node.js or a Node.js compatible runtime.
 *
 * **Note:** When running code in Bun and Deno with Node.js compatibility mode, `isNode` flag will be also `true`, indicating running in a Node.js compatible runtime.
 *
 * Use `runtime === "node"` if you need strict check for Node.js runtime.
 */
export declare const isNode: boolean;
/**
 * Indicates if running under [Nub](https://github.com/nubjs/nub).
 *
 * **Note:** Nub augments Node.js rather than replacing it, so `isNode` is also `true` and
 * `runtime` stays `"node"`. This flag is additive — it detects the Nub augmentation layer
 * on top of Node.
 */
export declare const isNub: boolean;
/**
 * Indicates if running in Bun runtime.
 */
export declare const isBun: boolean;
/**
 * Indicates if running in Deno runtime.
 */
export declare const isDeno: boolean;
/**
 * Indicates if running in Fastly runtime.
 */
export declare const isFastly: boolean;
/**
 * Indicates if running in Netlify runtime.
 */
export declare const isNetlify: boolean;
/**
 * Indicates if running in EdgeLight (Vercel Edge) runtime.
 */
export declare const isEdgeLight: boolean;
/**
 * Indicates if running in Cloudflare Workers runtime.
 *
 * https://developers.cloudflare.com/workers/runtime-apis/web-standards/#navigatoruseragent
 */
export declare const isWorkerd: boolean;
/**
 * Contains information about the detected runtime, if any.
 */
export declare const runtimeInfo: RuntimeInfo | undefined;
/**
 * A convenience constant that returns the name of the detected runtime,
 * defaults to an empty string if no runtime is detected.
 */
export declare const runtime: RuntimeName;
export type { AgentInfo, AgentName, ProviderInfo, ProviderName, RuntimeInfo, RuntimeName };