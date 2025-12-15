"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelevantGuide = exports.getDeviceName = void 0;
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
const genAI_1 = require("../config/genAI");
const zod_1 = require("../lib/zod");
const event_emmiter_1 = require("../config/event.emmiter");
const getDeviceName = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "getDeviceName",
        status: "started",
        message: "Identifying device name from user input",
        timestamp: Date.now()
    });
    if (state.deviceName) {
        console.log('🚀🚀🚀🚀working! ', state.deviceName);
    }
    // If device already exists AND user likely asking follow-up, skip extraction
    if (state.deviceName && !state.userInput.toLowerCase().includes("replace") &&
        !state.userInput.toLowerCase().includes("change")) {
        return {};
    }
    const finalPrompt = `
From the user input, extract the device name if present.
If no device is mentioned, return null.

User input:
${state.userInput}
`;
    const response = await genAI_1.genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: finalPrompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: (0, zod_to_json_schema_1.default)(zod_1.deviceSchema)
        }
    });
    const parsed = JSON.parse(response.text);
    const name = parsed.deviceName;
    if (!name) {
        return {};
    }
    event_emmiter_1.agentEvents.emit("progress", {
        node: "getDeviceName",
        status: "completed",
        message: `Device identified: ${name}`,
        timestamp: Date.now()
    });
    if (state.deviceName && name !== state.deviceName) {
        return {
            deviceName: name,
            deviceTitle: null,
            guides: null,
            selectedGuideId: null,
            guideDetails: null,
            cleanedData: null,
            finalResponse: null,
            webResult: null,
            webSearch: false
        };
    }
    // ✅ Same device → just keep it
    return { deviceName: name };
};
exports.getDeviceName = getDeviceName;
const getRelevantGuide = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "Getting Relevant Guide",
        status: "started",
        message: `Tying to get Relevant Guide that match your problem!`,
        timestamp: Date.now()
    });
    if (!state.guides || state.guides.length === 0) {
        console.error("State does not contain guides.");
        return { selectedGuideId: null, webSearch: true };
    }
    const promptContent = `
    FROM the given list of guides, you MUST select the single most relevant guide for the user's input. 
    Do not add any text outside of the JSON object.

    User Input: ${state.userInput}
    List of available guides: ${JSON.stringify(state.guides, null, 2)}
`;
    const response = await genAI_1.genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptContent,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: (0, zod_to_json_schema_1.default)(zod_1.guideSchema),
        },
    });
    const relevantGUide = JSON.parse(response.text);
    try {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Getting Relevant Guide",
            status: "completed",
            message: `Relevant Guide is Founded`,
            timestamp: Date.now()
        });
        return {
            selectedGuideId: relevantGUide.id,
            webSearch: false,
        };
    }
    catch (error) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Getting Relevant Guide",
            status: "error",
            message: `Cannot find Relevant data that matches your question`,
            timestamp: Date.now()
        });
        console.error("Failed to parse the model's JSON response:", error);
        return { webSearch: true };
    }
};
exports.getRelevantGuide = getRelevantGuide;
//# sourceMappingURL=ai.js.map