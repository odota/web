"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const jsdiff = __importStar(require("diff"));
const debug_1 = __importDefault(require("debug"));
const lodash_1 = require("lodash");
const colors_1 = require("./colors");
const util_1 = require("./util");
const information_message_1 = require("../../notifications/information-message");
const debugLogger = (0, debug_1.default)('testcafe:util:diff');
function unifiedDiff(actual, expected) {
    const msg = jsdiff.createPatch('string', actual, expected);
    // NOTE: Removing unimportant info from diff output
    const lines = msg.split('\n').splice(5);
    return lines
        .filter(util_1.cleanUpFilter)
        .map(colors_1.setColors)
        .filter((line) => !(0, lodash_1.isUndefined)(line) && !(0, lodash_1.isNull)(line))
        .join('\n');
}
function generate(actual, expected) {
    try {
        return unifiedDiff((0, util_1.stringify)(actual), (0, util_1.stringify)(expected));
    }
    catch (err) {
        debugLogger((0, information_message_1.FAILED_TO_GENERATE_DETAILED_DIFF)(err.message));
        return '';
    }
}
exports.generate = generate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZGlmZi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQjtBQUMvQixrREFBMEI7QUFDMUIsbUNBQTZDO0FBQzdDLHFDQUFxQztBQUNyQyxpQ0FBa0Q7QUFDbEQsaUZBQTJGO0FBRTNGLE1BQU0sV0FBVyxHQUFHLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFaEQsU0FBUyxXQUFXLENBQUUsTUFBYyxFQUFFLFFBQWdCO0lBQ2xELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUzRCxtREFBbUQ7SUFDbkQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEMsT0FBTyxLQUFLO1NBQ1AsTUFBTSxDQUFDLG9CQUFhLENBQUM7U0FDckIsR0FBRyxDQUFDLGtCQUFTLENBQUM7U0FDZCxNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBQSxvQkFBVyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxlQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNkO0FBQ0wsQ0FBQztBQUVELFNBQWdCLFFBQVEsQ0FBRSxNQUFlLEVBQUUsUUFBaUI7SUFDeEQsSUFBSTtRQUNBLE9BQU8sV0FBVyxDQUFDLElBQUEsZ0JBQVMsRUFBQyxNQUFNLENBQUMsRUFBRSxJQUFBLGdCQUFTLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUM5RDtJQUNELE9BQU8sR0FBUSxFQUFFO1FBQ2IsV0FBVyxDQUFDLElBQUEsc0RBQWdDLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFM0QsT0FBTyxFQUFFLENBQUM7S0FDYjtBQUNMLENBQUM7QUFURCw0QkFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGpzZGlmZiBmcm9tICdkaWZmJztcbmltcG9ydCBkZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCwgaXNOdWxsIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHNldENvbG9ycyB9IGZyb20gJy4vY29sb3JzJztcbmltcG9ydCB7IGNsZWFuVXBGaWx0ZXIsIHN0cmluZ2lmeSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgeyBGQUlMRURfVE9fR0VORVJBVEVfREVUQUlMRURfRElGRiB9IGZyb20gJy4uLy4uL25vdGlmaWNhdGlvbnMvaW5mb3JtYXRpb24tbWVzc2FnZSc7XG5cbmNvbnN0IGRlYnVnTG9nZ2VyID0gZGVidWcoJ3Rlc3RjYWZlOnV0aWw6ZGlmZicpO1xuXG5mdW5jdGlvbiB1bmlmaWVkRGlmZiAoYWN0dWFsOiBzdHJpbmcsIGV4cGVjdGVkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG1zZyA9IGpzZGlmZi5jcmVhdGVQYXRjaCgnc3RyaW5nJywgYWN0dWFsLCBleHBlY3RlZCk7XG5cbiAgICAvLyBOT1RFOiBSZW1vdmluZyB1bmltcG9ydGFudCBpbmZvIGZyb20gZGlmZiBvdXRwdXRcbiAgICBjb25zdCBsaW5lcyA9IG1zZy5zcGxpdCgnXFxuJykuc3BsaWNlKDUpO1xuXG4gICAgcmV0dXJuIGxpbmVzXG4gICAgICAgIC5maWx0ZXIoY2xlYW5VcEZpbHRlcilcbiAgICAgICAgLm1hcChzZXRDb2xvcnMpXG4gICAgICAgIC5maWx0ZXIoKGxpbmU6IGFueSkgPT4gIWlzVW5kZWZpbmVkKGxpbmUpICYmICFpc051bGwobGluZSkpXG4gICAgICAgIC5qb2luKCdcXG4nKVxuICAgIDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlIChhY3R1YWw6IHVua25vd24sIGV4cGVjdGVkOiB1bmtub3duKTogc3RyaW5nIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gdW5pZmllZERpZmYoc3RyaW5naWZ5KGFjdHVhbCksIHN0cmluZ2lmeShleHBlY3RlZCkpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgZGVidWdMb2dnZXIoRkFJTEVEX1RPX0dFTkVSQVRFX0RFVEFJTEVEX0RJRkYoZXJyLm1lc3NhZ2UpKTtcblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIl19