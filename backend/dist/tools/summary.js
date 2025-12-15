"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeWebsearchData = exports.summarize = void 0;
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
const genAI_1 = require("../config/genAI");
const zod_1 = require("../lib/zod");
const event_emmiter_1 = require("../config/event.emmiter");
const summarize = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "Summarizing response",
        status: "started",
        message: `Summarizing response!`,
        timestamp: Date.now()
    });
    // The content structure should only contain user/model turns
    const content = [
        {
            role: "user",
            // Combine the user input and the final data into a single user message
            parts: [{
                    text: `
            Here is the relevant data about the item:
            ${JSON.stringify(state.cleanedData, null, 2)}
            
            Based on the data above, please address the following user request:
            ${state.userInput}
        `
                }],
        },
    ];
    // The system instruction goes into the config object
    const config = {
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: (0, zod_to_json_schema_1.default)(zod_1.aiFinalResponseSchema),
            // Use the dedicated parameter for system instructions
            systemInstruction: "You are responsible for returning correct and structured information on how to fix the item based solely on the given content. Do not add conversational filler."
        }
    };
    const buffer = await genAI_1.genAI.models.generateContent(config);
    let finalSummary;
    try {
        finalSummary = JSON.parse(buffer.text);
    }
    catch (err) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Summarizing response",
            status: "error",
            message: `Failed to Summarize!`,
            timestamp: Date.now()
        });
        throw new Error("AI returned invalid JSON:\n" + buffer.text);
    }
    // Return the complete summary string
    return { finalSummary: finalSummary };
};
exports.summarize = summarize;
const summarizeWebsearchData = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "Summarizing response",
        status: "started",
        message: `Summarizing response!`,
        timestamp: Date.now()
    });
    const content = [
        {
            role: "user",
            parts: [{
                    text: `
            Here is the relevant data about the item:
            ${JSON.stringify(state, null, 2)}
            
            Based on the data above, please address the following user request:
            ${state.originalQuery}
        `
                }],
        }
    ];
    const config = {
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: (0, zod_to_json_schema_1.default)(zod_1.webDataSummarySchema),
            // Use the dedicated parameter for system instructions
            systemInstruction: "You are responsible for returning correct and structured information on how to fix the item based solely on the given content. Do not add conversational filler."
        }
    };
    const buffer = await genAI_1.genAI.models.generateContent(config);
    let finalSummary;
    try {
        finalSummary = JSON.parse(buffer.text);
    }
    catch (err) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Summarizing response",
            status: "error",
            message: `Failed to Summarize!`,
            timestamp: Date.now()
        });
        throw new Error("AI returned invalid JSON:\n" + buffer.text);
    }
    // Return the complete summary string
    return { finalSummary: finalSummary };
};
exports.summarizeWebsearchData = summarizeWebsearchData;
//# sourceMappingURL=summary.js.map