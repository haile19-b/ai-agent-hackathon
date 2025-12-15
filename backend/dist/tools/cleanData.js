"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean_tavily_data = exports.clean_iFixit_Data = void 0;
const event_emmiter_1 = require("../config/event.emmiter");
const clean_iFixit_Data = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "collecting Data",
        status: "started",
        message: "waite a moment!",
        timestamp: Date.now()
    });
    const data = state; // your full JSON payload
    const steps = data.guideDetails; // array of step objects
    // Clean each guide step
    const cleanedSteps = steps.map((step, index) => ({
        stepNumber: index + 1,
        text: step.text?.trim() || "",
        images: step.images || []
    }));
    // Final clean structured object
    const cleaned = {
        device: data.deviceTitle || data.deviceName,
        userInput: data.userInput,
        guideId: data.selectedGuideId,
        guideTitle: data.finalResponse,
        steps: cleanedSteps
    };
    // Store it back into state so other nodes can use it
    return {
        cleaned: true,
        cleanedData: cleaned
    };
};
exports.clean_iFixit_Data = clean_iFixit_Data;
const clean_tavily_data = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "collecting Data",
        status: "started",
        message: "waite a moment!",
        timestamp: Date.now()
    });
    try {
        if (!state.webResult || !state.webResult.results) {
            return {
                cleanedData: null,
                cleaned: false,
                error: "No webResult available for cleaning"
            };
        }
        const { query, results } = state.webResult;
        // Clean, normalize, structure data
        const cleaned = results.map((item, index) => ({
            id: index + 1,
            title: item.title?.trim() || "Untitled result",
            url: item.url,
            shortSummary: item.content?.trim() || "No description",
            score: item.score ?? null,
            sourceType: item.url.includes("youtube.com") || item.url.includes("youtu")
                ? "video"
                : item.url.includes("tiktok.com")
                    ? "short-video"
                    : "article"
        }));
        return {
            cleaned: true,
            cleanedData: {
                originalQuery: query,
                topResultsCount: cleaned.length,
                topResults: cleaned
            }
        };
    }
    catch (err) {
        return {
            cleaned: false,
            cleanedData: null,
            error: err.message
        };
    }
};
exports.clean_tavily_data = clean_tavily_data;
//# sourceMappingURL=cleanData.js.map