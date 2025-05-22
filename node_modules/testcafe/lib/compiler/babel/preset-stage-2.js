"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    presets: [{
            plugins: [
                require('babel-plugin-syntax-trailing-function-commas'),
                require('@babel/plugin-transform-async-to-generator'),
                require('@babel/plugin-transform-exponentiation-operator'),
                require('@babel/plugin-proposal-async-generator-functions'),
                require('@babel/plugin-proposal-object-rest-spread'),
            ],
        }],
    plugins: [
        require('@babel/plugin-syntax-dynamic-import'),
        [require('@babel/plugin-proposal-decorators'), { 'legacy': true }],
        require('@babel/plugin-proposal-class-properties'),
        require('@babel/plugin-proposal-async-generator-functions'),
    ],
};
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0LXN0YWdlLTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcGlsZXIvYmFiZWwvcHJlc2V0LXN0YWdlLTIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQkFBZTtJQUNYLE9BQU8sRUFBRSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLDRDQUE0QyxDQUFDO2dCQUNyRCxPQUFPLENBQUMsaURBQWlELENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxrREFBa0QsQ0FBQztnQkFDM0QsT0FBTyxDQUFDLDJDQUEyQyxDQUFDO2FBQ3ZEO1NBQ0osQ0FBQztJQUNGLE9BQU8sRUFBRTtRQUNMLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQztRQUM5QyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ2xFLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsa0RBQWtELENBQUM7S0FDOUQ7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAgIHByZXNldHM6IFt7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIHJlcXVpcmUoJ2JhYmVsLXBsdWdpbi1zeW50YXgtdHJhaWxpbmctZnVuY3Rpb24tY29tbWFzJyksXG4gICAgICAgICAgICByZXF1aXJlKCdAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1hc3luYy10by1nZW5lcmF0b3InKSxcbiAgICAgICAgICAgIHJlcXVpcmUoJ0BiYWJlbC9wbHVnaW4tdHJhbnNmb3JtLWV4cG9uZW50aWF0aW9uLW9wZXJhdG9yJyksXG4gICAgICAgICAgICByZXF1aXJlKCdAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWFzeW5jLWdlbmVyYXRvci1mdW5jdGlvbnMnKSxcbiAgICAgICAgICAgIHJlcXVpcmUoJ0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtb2JqZWN0LXJlc3Qtc3ByZWFkJyksXG4gICAgICAgIF0sXG4gICAgfV0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZXF1aXJlKCdAYmFiZWwvcGx1Z2luLXN5bnRheC1keW5hbWljLWltcG9ydCcpLFxuICAgICAgICBbcmVxdWlyZSgnQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1kZWNvcmF0b3JzJyksIHsgJ2xlZ2FjeSc6IHRydWUgfV0sXG4gICAgICAgIHJlcXVpcmUoJ0BiYWJlbC9wbHVnaW4tcHJvcG9zYWwtY2xhc3MtcHJvcGVydGllcycpLFxuICAgICAgICByZXF1aXJlKCdAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWFzeW5jLWdlbmVyYXRvci1mdW5jdGlvbnMnKSxcbiAgICBdLFxufTtcbiJdfQ==