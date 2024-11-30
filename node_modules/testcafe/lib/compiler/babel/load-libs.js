"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exportble_lib_path_1 = __importDefault(require("../test-file/exportble-lib-path"));
function getPresetEnvForTestCodeOpts(isCompilerServiceMode) {
    const opts = {
        targets: { node: 'current' },
        loose: true,
        exclude: ['transform-regenerator'],
    };
    if (isCompilerServiceMode)
        opts.modules = false;
    return opts;
}
function getPresetEnvForClientFunctionOpts() {
    return {
        loose: true,
        exclude: ['transform-typeof-symbol', 'transform-for-of'],
    };
}
function getModuleResolverOpts() {
    return {
        resolvePath(source) {
            if (source === 'testcafe')
                return exportble_lib_path_1.default;
            return source;
        },
    };
}
function getTransformForOfOptions() {
    // NOTE: allowArrayLike is required to allow iterating non-iterable objects (e.g. NodeList)
    // to preserve compatibility with older TestCafe code
    return { loose: true, allowArrayLike: true };
}
function getTransformRuntimeOpts() {
    // NOTE: We are forced to import helpers to each compiled file
    // because of '@babel/plugin-transform-runtime' plugin cannot correctly resolve path
    // to the helpers from the '@babel/runtime' module.
    return {
        'helpers': false,
    };
}
function getPresetReact() {
    const presetReact = require('@babel/preset-react');
    presetReact.presets = []; // disables flow so it doesn't confict w/ presetFlow
    return presetReact;
}
// NOTE: lazy load heavy dependencies
function loadLibs(isCompilerServiceMode) {
    return {
        babel: require('@babel/core'),
        presetStage2: require('./preset-stage-2'),
        presetFlow: require('@babel/preset-flow'),
        transformRuntime: [require('@babel/plugin-transform-runtime'), getTransformRuntimeOpts()],
        transformForOfAsArray: [require('@babel/plugin-transform-for-of'), getTransformForOfOptions()],
        presetEnvForClientFunction: [require('@babel/preset-env'), getPresetEnvForClientFunctionOpts()],
        presetEnvForTestCode: [require('@babel/preset-env'), getPresetEnvForTestCodeOpts(isCompilerServiceMode)],
        moduleResolver: [require('babel-plugin-module-resolver'), getModuleResolverOpts()],
        presetReact: getPresetReact(),
        proposalPrivateMethods: [require('@babel/plugin-proposal-private-methods'), { loose: true }],
        proposalClassProperties: [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    };
}
exports.default = loadLibs;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1saWJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBpbGVyL2JhYmVsL2xvYWQtbGlicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlGQUFrRTtBQUVsRSxTQUFTLDJCQUEyQixDQUFFLHFCQUFxQjtJQUN2RCxNQUFNLElBQUksR0FBRztRQUNULE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7UUFDNUIsS0FBSyxFQUFJLElBQUk7UUFDYixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUNyQyxDQUFDO0lBRUYsSUFBSSxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFekIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsaUNBQWlDO0lBQ3RDLE9BQU87UUFDSCxLQUFLLEVBQUksSUFBSTtRQUNiLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixDQUFDO0tBQzNELENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxxQkFBcUI7SUFDMUIsT0FBTztRQUNILFdBQVcsQ0FBRSxNQUFNO1lBQ2YsSUFBSSxNQUFNLEtBQUssVUFBVTtnQkFDckIsT0FBTyw0QkFBbUIsQ0FBQztZQUUvQixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLHdCQUF3QjtJQUM3QiwyRkFBMkY7SUFDM0YscURBQXFEO0lBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyx1QkFBdUI7SUFDNUIsOERBQThEO0lBQzlELG9GQUFvRjtJQUNwRixtREFBbUQ7SUFDbkQsT0FBTztRQUNILFNBQVMsRUFBRSxLQUFLO0tBQ25CLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxjQUFjO0lBQ25CLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRW5ELFdBQVcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsb0RBQW9EO0lBRTlFLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxxQ0FBcUM7QUFDckMsU0FBd0IsUUFBUSxDQUFFLHFCQUFxQjtJQUNuRCxPQUFPO1FBQ0gsS0FBSyxFQUF1QixPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ2xELFlBQVksRUFBZ0IsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELFVBQVUsRUFBa0IsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQ3pELGdCQUFnQixFQUFZLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztRQUNuRyxxQkFBcUIsRUFBTyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLHdCQUF3QixFQUFFLENBQUM7UUFDbkcsMEJBQTBCLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxpQ0FBaUMsRUFBRSxDQUFDO1FBQy9GLG9CQUFvQixFQUFRLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsMkJBQTJCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM5RyxjQUFjLEVBQWMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsRUFBRSxxQkFBcUIsRUFBRSxDQUFDO1FBQzlGLFdBQVcsRUFBaUIsY0FBYyxFQUFFO1FBQzVDLHNCQUFzQixFQUFNLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDaEcsdUJBQXVCLEVBQUssQ0FBQyxPQUFPLENBQUMseUNBQXlDLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNwRyxDQUFDO0FBQ04sQ0FBQztBQWRELDJCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVYUE9SVEFCTEVfTElCX1BBVEggZnJvbSAnLi4vdGVzdC1maWxlL2V4cG9ydGJsZS1saWItcGF0aCc7XG5cbmZ1bmN0aW9uIGdldFByZXNldEVudkZvclRlc3RDb2RlT3B0cyAoaXNDb21waWxlclNlcnZpY2VNb2RlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgICAgdGFyZ2V0czogeyBub2RlOiAnY3VycmVudCcgfSxcbiAgICAgICAgbG9vc2U6ICAgdHJ1ZSxcbiAgICAgICAgZXhjbHVkZTogWyd0cmFuc2Zvcm0tcmVnZW5lcmF0b3InXSxcbiAgICB9O1xuXG4gICAgaWYgKGlzQ29tcGlsZXJTZXJ2aWNlTW9kZSlcbiAgICAgICAgb3B0cy5tb2R1bGVzID0gZmFsc2U7XG5cbiAgICByZXR1cm4gb3B0cztcbn1cblxuZnVuY3Rpb24gZ2V0UHJlc2V0RW52Rm9yQ2xpZW50RnVuY3Rpb25PcHRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb29zZTogICB0cnVlLFxuICAgICAgICBleGNsdWRlOiBbJ3RyYW5zZm9ybS10eXBlb2Ytc3ltYm9sJywgJ3RyYW5zZm9ybS1mb3Itb2YnXSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRNb2R1bGVSZXNvbHZlck9wdHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc29sdmVQYXRoIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT09ICd0ZXN0Y2FmZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVYUE9SVEFCTEVfTElCX1BBVEg7XG5cbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtRm9yT2ZPcHRpb25zICgpIHtcbiAgICAvLyBOT1RFOiBhbGxvd0FycmF5TGlrZSBpcyByZXF1aXJlZCB0byBhbGxvdyBpdGVyYXRpbmcgbm9uLWl0ZXJhYmxlIG9iamVjdHMgKGUuZy4gTm9kZUxpc3QpXG4gICAgLy8gdG8gcHJlc2VydmUgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIFRlc3RDYWZlIGNvZGVcbiAgICByZXR1cm4geyBsb29zZTogdHJ1ZSwgYWxsb3dBcnJheUxpa2U6IHRydWUgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtUnVudGltZU9wdHMgKCkge1xuICAgIC8vIE5PVEU6IFdlIGFyZSBmb3JjZWQgdG8gaW1wb3J0IGhlbHBlcnMgdG8gZWFjaCBjb21waWxlZCBmaWxlXG4gICAgLy8gYmVjYXVzZSBvZiAnQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcnVudGltZScgcGx1Z2luIGNhbm5vdCBjb3JyZWN0bHkgcmVzb2x2ZSBwYXRoXG4gICAgLy8gdG8gdGhlIGhlbHBlcnMgZnJvbSB0aGUgJ0BiYWJlbC9ydW50aW1lJyBtb2R1bGUuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2hlbHBlcnMnOiBmYWxzZSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQcmVzZXRSZWFjdCAoKSB7XG4gICAgY29uc3QgcHJlc2V0UmVhY3QgPSByZXF1aXJlKCdAYmFiZWwvcHJlc2V0LXJlYWN0Jyk7XG5cbiAgICBwcmVzZXRSZWFjdC5wcmVzZXRzID0gW107IC8vIGRpc2FibGVzIGZsb3cgc28gaXQgZG9lc24ndCBjb25maWN0IHcvIHByZXNldEZsb3dcblxuICAgIHJldHVybiBwcmVzZXRSZWFjdDtcbn1cblxuLy8gTk9URTogbGF6eSBsb2FkIGhlYXZ5IGRlcGVuZGVuY2llc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZExpYnMgKGlzQ29tcGlsZXJTZXJ2aWNlTW9kZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJhYmVsOiAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlKCdAYmFiZWwvY29yZScpLFxuICAgICAgICBwcmVzZXRTdGFnZTI6ICAgICAgICAgICAgICAgcmVxdWlyZSgnLi9wcmVzZXQtc3RhZ2UtMicpLFxuICAgICAgICBwcmVzZXRGbG93OiAgICAgICAgICAgICAgICAgcmVxdWlyZSgnQGJhYmVsL3ByZXNldC1mbG93JyksXG4gICAgICAgIHRyYW5zZm9ybVJ1bnRpbWU6ICAgICAgICAgICBbcmVxdWlyZSgnQGJhYmVsL3BsdWdpbi10cmFuc2Zvcm0tcnVudGltZScpLCBnZXRUcmFuc2Zvcm1SdW50aW1lT3B0cygpXSxcbiAgICAgICAgdHJhbnNmb3JtRm9yT2ZBc0FycmF5OiAgICAgIFtyZXF1aXJlKCdAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1mb3Itb2YnKSwgZ2V0VHJhbnNmb3JtRm9yT2ZPcHRpb25zKCldLFxuICAgICAgICBwcmVzZXRFbnZGb3JDbGllbnRGdW5jdGlvbjogW3JlcXVpcmUoJ0BiYWJlbC9wcmVzZXQtZW52JyksIGdldFByZXNldEVudkZvckNsaWVudEZ1bmN0aW9uT3B0cygpXSxcbiAgICAgICAgcHJlc2V0RW52Rm9yVGVzdENvZGU6ICAgICAgIFtyZXF1aXJlKCdAYmFiZWwvcHJlc2V0LWVudicpLCBnZXRQcmVzZXRFbnZGb3JUZXN0Q29kZU9wdHMoaXNDb21waWxlclNlcnZpY2VNb2RlKV0sXG4gICAgICAgIG1vZHVsZVJlc29sdmVyOiAgICAgICAgICAgICBbcmVxdWlyZSgnYmFiZWwtcGx1Z2luLW1vZHVsZS1yZXNvbHZlcicpLCBnZXRNb2R1bGVSZXNvbHZlck9wdHMoKV0sXG4gICAgICAgIHByZXNldFJlYWN0OiAgICAgICAgICAgICAgICBnZXRQcmVzZXRSZWFjdCgpLFxuICAgICAgICBwcm9wb3NhbFByaXZhdGVNZXRob2RzOiAgICAgW3JlcXVpcmUoJ0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtcHJpdmF0ZS1tZXRob2RzJyksIHsgbG9vc2U6IHRydWUgfV0sXG4gICAgICAgIHByb3Bvc2FsQ2xhc3NQcm9wZXJ0aWVzOiAgICBbcmVxdWlyZSgnQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzJyksIHsgbG9vc2U6IHRydWUgfV0sXG4gICAgfTtcbn1cbiJdfQ==