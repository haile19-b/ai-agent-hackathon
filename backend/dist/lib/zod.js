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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.webDataSummarySchema = exports.aiFinalResponseSchema = exports.stepSchema = exports.guideSchema = exports.deviceSchema = void 0;
const z = __importStar(require("zod/v3"));
exports.deviceSchema = z.object({
    deviceName: z.string().describe('name of the device that the user is wanting to fix in the format we can get it on the iFixit')
});
exports.guideSchema = z.object({
    id: z.number().describe("the unique id for the guide"),
    relevantGuid: z.string().describe("the most relevant guide to the users input to solve users problem")
});
exports.stepSchema = z.object({
    title: z.string().describe("text that can be title for the step"),
    description: z.string().describe("clear statement that describe the step"),
    image: z.array(z.string()).describe("array of image urls in correct order")
});
exports.aiFinalResponseSchema = z.object({
    steps: z.array(exports.stepSchema).describe("this is array of the steps")
});
exports.webDataSummarySchema = z.object({
    title: z.string().describe("thi is the over title for the response"),
    shortSummary: z.string().describe("this is the summary of the result"),
    url: z.array(z.string()).describe("this is the collection of url optained from the web-search!")
});
//# sourceMappingURL=zod.js.map