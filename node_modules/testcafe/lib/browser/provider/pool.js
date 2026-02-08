"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const built_in_1 = __importDefault(require("./built-in"));
const plugin_host_1 = __importDefault(require("./plugin-host"));
const parse_provider_name_1 = __importDefault(require("./parse-provider-name"));
const _1 = __importDefault(require("./"));
const connection_1 = __importDefault(require("../connection"));
const runtime_1 = require("../../errors/runtime");
const types_1 = require("../../errors/types");
const BROWSER_PROVIDER_RE = /^([^:\s]+):?(.*)?$/;
const BROWSER_INFO_PROPERTIES = ['browserName', 'browserOption', 'providerName', 'provider'];
exports.default = {
    providersCache: {},
    async _handlePathAndCmd(alias) {
        const browserName = JSON.stringify(alias);
        const providerName = 'path';
        const provider = await this.getProvider(providerName);
        const browserOption = provider.plugin.getConfig(browserName);
        return { provider, providerName, browserName, browserOption };
    },
    async _parseAliasString(alias) {
        const providerRegExpMatch = BROWSER_PROVIDER_RE.exec(alias);
        if (!providerRegExpMatch)
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindBrowser, alias);
        let providerName = providerRegExpMatch[1];
        let browserName = providerRegExpMatch[2] || '';
        let browserOption = {};
        let provider = await this.getProvider(providerName);
        if (!provider && providerRegExpMatch[2])
            provider = await this.getProvider(providerName + ':');
        if (!provider) {
            providerName = 'locally-installed';
            provider = await this.getProvider(providerName);
            browserName = providerRegExpMatch[1] || '';
        }
        browserOption = provider.plugin.getConfig(browserName);
        return { provider, providerName, browserName, browserOption };
    },
    async _parseAlias(alias) {
        if (typeof alias === 'object') {
            if (BROWSER_INFO_PROPERTIES.every(property => property in alias))
                return alias;
            if (alias.path)
                return this._handlePathAndCmd(alias);
        }
        if (typeof alias === 'string')
            return this._parseAliasString(alias);
        throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindBrowser, alias);
    },
    async _getInfoForAllBrowserNames(provider, providerName) {
        const allBrowserNames = provider.isMultiBrowser ?
            await provider.getBrowserList() :
            [];
        if (!allBrowserNames.length)
            return { provider, providerName, browserName: '', browserOption: '' };
        return allBrowserNames
            .map(browserName => ({ provider, providerName, browserName, browserOption: browserName }));
    },
    _getProviderModule(providerName, moduleName) {
        try {
            // First, just check if the module exists
            require.resolve(moduleName);
        }
        catch (e) {
            // Module does not exist. Return null, and let the caller handle
            return null;
        }
        // Load the module
        const providerObject = require(moduleName);
        this.addProvider(providerName, providerObject);
        return this._getProviderFromCache(providerName);
    },
    _getProviderFromCache(providerName) {
        return this.providersCache[providerName] || null;
    },
    _getBuiltinProvider(providerName) {
        const providerObject = built_in_1.default[providerName];
        if (!providerObject)
            return null;
        this.addProvider(providerName, providerObject);
        return this._getProviderFromCache(providerName);
    },
    async getBrowserInfo(alias) {
        if (alias instanceof connection_1.default)
            return alias;
        const browserInfo = await this._parseAlias(alias);
        const { provider, providerName, browserName } = browserInfo;
        if (browserName === 'all')
            return await this._getInfoForAllBrowserNames(provider, providerName);
        if (!await provider.isValidBrowserName(browserName))
            throw new runtime_1.GeneralError(types_1.RUNTIME_ERRORS.cannotFindBrowser, alias);
        if (typeof alias === 'object' && alias.alias)
            alias = alias.alias;
        if (typeof alias !== 'string')
            alias = JSON.stringify(alias);
        return Object.assign({ alias }, browserInfo);
    },
    addProvider(providerName, providerObject) {
        providerName = (0, parse_provider_name_1.default)(providerName).providerName;
        this.providersCache[providerName] = new _1.default(new plugin_host_1.default(providerObject, providerName));
    },
    removeProvider(providerName) {
        providerName = (0, parse_provider_name_1.default)(providerName).providerName;
        delete this.providersCache[providerName];
    },
    async getProvider(providerName) {
        const parsedProviderName = (0, parse_provider_name_1.default)(providerName);
        const moduleName = parsedProviderName.moduleName;
        providerName = parsedProviderName.providerName;
        const provider = this._getProviderFromCache(providerName) ||
            this._getProviderModule(providerName, moduleName) ||
            this._getBuiltinProvider(providerName);
        if (provider)
            await this.providersCache[providerName].init();
        return provider;
    },
    dispose() {
        return Promise.all(Object.values(this.providersCache).map(item => item.dispose()));
    },
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9icm93c2VyL3Byb3ZpZGVyL3Bvb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBNEM7QUFDNUMsZ0VBQXNEO0FBQ3RELGdGQUFzRDtBQUN0RCwwQ0FBaUM7QUFDakMsK0RBQThDO0FBQzlDLGtEQUFvRDtBQUNwRCw4Q0FBb0Q7QUFFcEQsTUFBTSxtQkFBbUIsR0FBTyxvQkFBb0IsQ0FBQztBQUNyRCxNQUFNLHVCQUF1QixHQUFHLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFN0Ysa0JBQWU7SUFDWCxjQUFjLEVBQUUsRUFBRTtJQUVsQixLQUFLLENBQUMsaUJBQWlCLENBQUUsS0FBSztRQUMxQixNQUFNLFdBQVcsR0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLE1BQU0sWUFBWSxHQUFJLE1BQU0sQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBUSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0QsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUUsS0FBSztRQUMxQixNQUFNLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsbUJBQW1CO1lBQ3BCLE1BQU0sSUFBSSxzQkFBWSxDQUFDLHNCQUFjLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEUsSUFBSSxZQUFZLEdBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENB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LWluJztcbmltcG9ydCBCcm93c2VyUHJvdmlkZXJQbHVnaW5Ib3N0IGZyb20gJy4vcGx1Z2luLWhvc3QnO1xuaW1wb3J0IHBhcnNlUHJvdmlkZXJOYW1lIGZyb20gJy4vcGFyc2UtcHJvdmlkZXItbmFtZSc7XG5pbXBvcnQgQnJvd3NlclByb3ZpZGVyIGZyb20gJy4vJztcbmltcG9ydCBCcm93c2VyQ29ubmVjdGlvbiBmcm9tICcuLi9jb25uZWN0aW9uJztcbmltcG9ydCB7IEdlbmVyYWxFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9ycy9ydW50aW1lJztcbmltcG9ydCB7IFJVTlRJTUVfRVJST1JTIH0gZnJvbSAnLi4vLi4vZXJyb3JzL3R5cGVzJztcblxuY29uc3QgQlJPV1NFUl9QUk9WSURFUl9SRSAgICAgPSAvXihbXjpcXHNdKyk6PyguKik/JC87XG5jb25zdCBCUk9XU0VSX0lORk9fUFJPUEVSVElFUyA9IFsnYnJvd3Nlck5hbWUnLCAnYnJvd3Nlck9wdGlvbicsICdwcm92aWRlck5hbWUnLCAncHJvdmlkZXInXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3ZpZGVyc0NhY2hlOiB7fSxcblxuICAgIGFzeW5jIF9oYW5kbGVQYXRoQW5kQ21kIChhbGlhcykge1xuICAgICAgICBjb25zdCBicm93c2VyTmFtZSAgID0gSlNPTi5zdHJpbmdpZnkoYWxpYXMpO1xuICAgICAgICBjb25zdCBwcm92aWRlck5hbWUgID0gJ3BhdGgnO1xuICAgICAgICBjb25zdCBwcm92aWRlciAgICAgID0gYXdhaXQgdGhpcy5nZXRQcm92aWRlcihwcm92aWRlck5hbWUpO1xuICAgICAgICBjb25zdCBicm93c2VyT3B0aW9uID0gcHJvdmlkZXIucGx1Z2luLmdldENvbmZpZyhicm93c2VyTmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHsgcHJvdmlkZXIsIHByb3ZpZGVyTmFtZSwgYnJvd3Nlck5hbWUsIGJyb3dzZXJPcHRpb24gfTtcbiAgICB9LFxuXG4gICAgYXN5bmMgX3BhcnNlQWxpYXNTdHJpbmcgKGFsaWFzKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyUmVnRXhwTWF0Y2ggPSBCUk9XU0VSX1BST1ZJREVSX1JFLmV4ZWMoYWxpYXMpO1xuXG4gICAgICAgIGlmICghcHJvdmlkZXJSZWdFeHBNYXRjaClcbiAgICAgICAgICAgIHRocm93IG5ldyBHZW5lcmFsRXJyb3IoUlVOVElNRV9FUlJPUlMuY2Fubm90RmluZEJyb3dzZXIsIGFsaWFzKTtcblxuICAgICAgICBsZXQgcHJvdmlkZXJOYW1lICA9IHByb3ZpZGVyUmVnRXhwTWF0Y2hbMV07XG4gICAgICAgIGxldCBicm93c2VyTmFtZSAgID0gcHJvdmlkZXJSZWdFeHBNYXRjaFsyXSB8fCAnJztcbiAgICAgICAgbGV0IGJyb3dzZXJPcHRpb24gPSB7fTtcblxuICAgICAgICBsZXQgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmdldFByb3ZpZGVyKHByb3ZpZGVyTmFtZSk7XG5cbiAgICAgICAgaWYgKCFwcm92aWRlciAmJiBwcm92aWRlclJlZ0V4cE1hdGNoWzJdKVxuICAgICAgICAgICAgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLmdldFByb3ZpZGVyKHByb3ZpZGVyTmFtZSArICc6Jyk7XG5cbiAgICAgICAgaWYgKCFwcm92aWRlcikge1xuICAgICAgICAgICAgcHJvdmlkZXJOYW1lID0gJ2xvY2FsbHktaW5zdGFsbGVkJztcbiAgICAgICAgICAgIHByb3ZpZGVyICAgICA9IGF3YWl0IHRoaXMuZ2V0UHJvdmlkZXIocHJvdmlkZXJOYW1lKTtcbiAgICAgICAgICAgIGJyb3dzZXJOYW1lICA9IHByb3ZpZGVyUmVnRXhwTWF0Y2hbMV0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBicm93c2VyT3B0aW9uID0gcHJvdmlkZXIucGx1Z2luLmdldENvbmZpZyhicm93c2VyTmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHsgcHJvdmlkZXIsIHByb3ZpZGVyTmFtZSwgYnJvd3Nlck5hbWUsIGJyb3dzZXJPcHRpb24gfTtcbiAgICB9LFxuXG4gICAgYXN5bmMgX3BhcnNlQWxpYXMgKGFsaWFzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWxpYXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoQlJPV1NFUl9JTkZPX1BST1BFUlRJRVMuZXZlcnkocHJvcGVydHkgPT4gcHJvcGVydHkgaW4gYWxpYXMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBhbGlhcztcblxuICAgICAgICAgICAgaWYgKGFsaWFzLnBhdGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVBhdGhBbmRDbWQoYWxpYXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhbGlhcyA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VBbGlhc1N0cmluZyhhbGlhcyk7XG5cbiAgICAgICAgdGhyb3cgbmV3IEdlbmVyYWxFcnJvcihSVU5USU1FX0VSUk9SUy5jYW5ub3RGaW5kQnJvd3NlciwgYWxpYXMpO1xuICAgIH0sXG5cbiAgICBhc3luYyBfZ2V0SW5mb0ZvckFsbEJyb3dzZXJOYW1lcyAocHJvdmlkZXIsIHByb3ZpZGVyTmFtZSkge1xuICAgICAgICBjb25zdCBhbGxCcm93c2VyTmFtZXMgPSBwcm92aWRlci5pc011bHRpQnJvd3NlciA/XG4gICAgICAgICAgICBhd2FpdCBwcm92aWRlci5nZXRCcm93c2VyTGlzdCgpIDpcbiAgICAgICAgICAgIFtdO1xuXG4gICAgICAgIGlmICghYWxsQnJvd3Nlck5hbWVzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB7IHByb3ZpZGVyLCBwcm92aWRlck5hbWUsIGJyb3dzZXJOYW1lOiAnJywgYnJvd3Nlck9wdGlvbjogJycgfTtcblxuICAgICAgICByZXR1cm4gYWxsQnJvd3Nlck5hbWVzXG4gICAgICAgICAgICAubWFwKGJyb3dzZXJOYW1lID0+ICh7IHByb3ZpZGVyLCBwcm92aWRlck5hbWUsIGJyb3dzZXJOYW1lLCBicm93c2VyT3B0aW9uOiBicm93c2VyTmFtZSB9KSk7XG4gICAgfSxcblxuICAgIF9nZXRQcm92aWRlck1vZHVsZSAocHJvdmlkZXJOYW1lLCBtb2R1bGVOYW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGaXJzdCwganVzdCBjaGVjayBpZiB0aGUgbW9kdWxlIGV4aXN0c1xuICAgICAgICAgICAgcmVxdWlyZS5yZXNvbHZlKG1vZHVsZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBNb2R1bGUgZG9lcyBub3QgZXhpc3QuIFJldHVybiBudWxsLCBhbmQgbGV0IHRoZSBjYWxsZXIgaGFuZGxlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvYWQgdGhlIG1vZHVsZVxuICAgICAgICBjb25zdCBwcm92aWRlck9iamVjdCA9IHJlcXVpcmUobW9kdWxlTmFtZSk7XG5cbiAgICAgICAgdGhpcy5hZGRQcm92aWRlcihwcm92aWRlck5hbWUsIHByb3ZpZGVyT2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3ZpZGVyRnJvbUNhY2hlKHByb3ZpZGVyTmFtZSk7XG4gICAgfSxcblxuICAgIF9nZXRQcm92aWRlckZyb21DYWNoZSAocHJvdmlkZXJOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3ZpZGVyc0NhY2hlW3Byb3ZpZGVyTmFtZV0gfHwgbnVsbDtcbiAgICB9LFxuXG4gICAgX2dldEJ1aWx0aW5Qcm92aWRlciAocHJvdmlkZXJOYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb3ZpZGVyT2JqZWN0ID0gQlVJTFRfSU5fUFJPVklERVJTW3Byb3ZpZGVyTmFtZV07XG5cbiAgICAgICAgaWYgKCFwcm92aWRlck9iamVjdClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIHRoaXMuYWRkUHJvdmlkZXIocHJvdmlkZXJOYW1lLCBwcm92aWRlck9iamVjdCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3ZpZGVyRnJvbUNhY2hlKHByb3ZpZGVyTmFtZSk7XG4gICAgfSxcblxuICAgIGFzeW5jIGdldEJyb3dzZXJJbmZvIChhbGlhcykge1xuICAgICAgICBpZiAoYWxpYXMgaW5zdGFuY2VvZiBCcm93c2VyQ29ubmVjdGlvbilcbiAgICAgICAgICAgIHJldHVybiBhbGlhcztcblxuICAgICAgICBjb25zdCBicm93c2VySW5mbyA9IGF3YWl0IHRoaXMuX3BhcnNlQWxpYXMoYWxpYXMpO1xuXG4gICAgICAgIGNvbnN0IHsgcHJvdmlkZXIsIHByb3ZpZGVyTmFtZSwgYnJvd3Nlck5hbWUgfSA9IGJyb3dzZXJJbmZvO1xuXG4gICAgICAgIGlmIChicm93c2VyTmFtZSA9PT0gJ2FsbCcpXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0SW5mb0ZvckFsbEJyb3dzZXJOYW1lcyhwcm92aWRlciwgcHJvdmlkZXJOYW1lKTtcblxuICAgICAgICBpZiAoIWF3YWl0IHByb3ZpZGVyLmlzVmFsaWRCcm93c2VyTmFtZShicm93c2VyTmFtZSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgR2VuZXJhbEVycm9yKFJVTlRJTUVfRVJST1JTLmNhbm5vdEZpbmRCcm93c2VyLCBhbGlhcyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhbGlhcyA9PT0gJ29iamVjdCcgJiYgYWxpYXMuYWxpYXMpXG4gICAgICAgICAgICBhbGlhcyA9IGFsaWFzLmFsaWFzO1xuXG4gICAgICAgIGlmICh0eXBlb2YgYWxpYXMgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgYWxpYXMgPSBKU09OLnN0cmluZ2lmeShhbGlhcyk7XG5cbiAgICAgICAgcmV0dXJuIHsgYWxpYXMsIC4uLmJyb3dzZXJJbmZvIH07XG4gICAgfSxcblxuICAgIGFkZFByb3ZpZGVyIChwcm92aWRlck5hbWUsIHByb3ZpZGVyT2JqZWN0KSB7XG4gICAgICAgIHByb3ZpZGVyTmFtZSA9IHBhcnNlUHJvdmlkZXJOYW1lKHByb3ZpZGVyTmFtZSkucHJvdmlkZXJOYW1lO1xuXG4gICAgICAgIHRoaXMucHJvdmlkZXJzQ2FjaGVbcHJvdmlkZXJOYW1lXSA9IG5ldyBCcm93c2VyUHJvdmlkZXIoXG4gICAgICAgICAgICBuZXcgQnJvd3NlclByb3ZpZGVyUGx1Z2luSG9zdChwcm92aWRlck9iamVjdCwgcHJvdmlkZXJOYW1lKVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm92aWRlciAocHJvdmlkZXJOYW1lKSB7XG4gICAgICAgIHByb3ZpZGVyTmFtZSA9IHBhcnNlUHJvdmlkZXJOYW1lKHByb3ZpZGVyTmFtZSkucHJvdmlkZXJOYW1lO1xuXG4gICAgICAgIGRlbGV0ZSB0aGlzLnByb3ZpZGVyc0NhY2hlW3Byb3ZpZGVyTmFtZV07XG4gICAgfSxcblxuICAgIGFzeW5jIGdldFByb3ZpZGVyIChwcm92aWRlck5hbWUpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkUHJvdmlkZXJOYW1lID0gcGFyc2VQcm92aWRlck5hbWUocHJvdmlkZXJOYW1lKTtcbiAgICAgICAgY29uc3QgbW9kdWxlTmFtZSAgICAgICAgID0gcGFyc2VkUHJvdmlkZXJOYW1lLm1vZHVsZU5hbWU7XG5cbiAgICAgICAgcHJvdmlkZXJOYW1lID0gcGFyc2VkUHJvdmlkZXJOYW1lLnByb3ZpZGVyTmFtZTtcblxuICAgICAgICBjb25zdCBwcm92aWRlciA9IHRoaXMuX2dldFByb3ZpZGVyRnJvbUNhY2hlKHByb3ZpZGVyTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0UHJvdmlkZXJNb2R1bGUocHJvdmlkZXJOYW1lLCBtb2R1bGVOYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRCdWlsdGluUHJvdmlkZXIocHJvdmlkZXJOYW1lKTtcblxuICAgICAgICBpZiAocHJvdmlkZXIpXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnByb3ZpZGVyc0NhY2hlW3Byb3ZpZGVyTmFtZV0uaW5pdCgpO1xuXG4gICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICB9LFxuXG4gICAgZGlzcG9zZSAoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChPYmplY3QudmFsdWVzKHRoaXMucHJvdmlkZXJzQ2FjaGUpLm1hcChpdGVtID0+IGl0ZW0uZGlzcG9zZSgpKSk7XG4gICAgfSxcbn07XG4iXX0=