"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallbackSearchNode = void 0;
const event_emmiter_1 = require("../config/event.emmiter");
const tavily_1 = __importDefault(require("../config/tavily"));
const fallbackSearchNode = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "Searching Web...",
        status: "started",
        message: "searching for web",
        timestamp: Date.now()
    });
    const res = await tavily_1.default.search(state.userInput);
    try {
        const content = {
            query: res.query,
            results: res.results
        };
        return {
            // Slices the first 3 results from the response
            webSearch: true,
            webResult: content
        };
    }
    catch (error) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "getDeviceName",
            status: "error",
            message: "Error occurred searching web!",
            timestamp: Date.now()
        });
        return { webSearch: false, error: error.message };
    }
};
exports.fallbackSearchNode = fallbackSearchNode;
//# sourceMappingURL=tavily.js.map