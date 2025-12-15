"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guideDetailsNode = exports.guideListNode = exports.deviceSearchNode = void 0;
const axios_1 = __importDefault(require("axios"));
const event_emmiter_1 = require("../config/event.emmiter");
// passed
const deviceSearchNode = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "deviceSearch",
        status: "started",
        message: "Searching iFixit for device",
        timestamp: Date.now()
    });
    if (!state.deviceName) {
        console.error("deviceName is missing from state:", state);
        return { deviceFound: false, error: "Missing device name input" };
    }
    const query = encodeURIComponent(state.deviceName);
    const url = `https://www.ifixit.com/api/2.0/search/${query}?filter=device`;
    try {
        const response = await axios_1.default.get(url);
        const json = response.data;
        if (!json?.results?.length) {
            // Log for debugging if you want
            return { deviceFound: false };
        }
        const top = json.results[0];
        event_emmiter_1.agentEvents.emit("progress", {
            node: "deviceSearch",
            status: "completed",
            message: `device Found: ${top.title}`,
            timestamp: Date.now()
        });
        return {
            deviceFound: true,
            deviceTitle: top.title
        };
    }
    catch (error) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "deviceSearch",
            status: "error",
            message: `cannot get device with Device name: ${state.deviceName} from iFixit!`,
            timestamp: Date.now()
        });
        // Handle network errors or API failures gracefully
        console.error("Error fetching device search data:", error.message);
        return { deviceFound: false, error: "Network error occurred" };
    }
};
exports.deviceSearchNode = deviceSearchNode;
//passed
const guideListNode = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "guideListSearch",
        status: "started",
        message: `Searching for List of Guides from iFixit!`,
        timestamp: Date.now()
    });
    const url = `https://www.ifixit.com/api/2.0/wikis/CATEGORY/${state.deviceTitle}`;
    try {
        // Axios handles the request and the JSON parsing automatically.
        const response = await axios_1.default.get(url);
        const json = response.data; // The parsed JSON data is in response.data
        if (!json?.guides.length) {
            return { guidesFound: false };
        }
        event_emmiter_1.agentEvents.emit("progress", {
            node: "guideListSearch",
            status: "completed",
            message: `List of Guides are Founded for Your Search form iFixit!`,
            timestamp: Date.now()
        });
        return {
            guidesFound: true,
            guides: json.guides.map((guide) => ({
                id: guide.guideid,
                title: guide.title
            }))
        };
    }
    catch (error) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "guideListSearch",
            status: "error",
            message: `Finding List of Guides is failed`,
            timestamp: Date.now()
        });
        // Handle potential network errors or API errors
        console.error("Error fetching guide list:", error.message);
        return { guidesFound: false, error: "Network error occurred" };
    }
};
exports.guideListNode = guideListNode;
//passed
const guideDetailsNode = async (state) => {
    event_emmiter_1.agentEvents.emit("progress", {
        node: "Getting steps to solve",
        status: "started",
        message: `Finding Steps form iFixit!`,
        timestamp: Date.now()
    });
    const guideIdToFind = state.selectedGuideId;
    const url = `https://www.ifixit.com/api/2.0/guides/${guideIdToFind}`;
    try {
        // Axios handles the request and the JSON parsing automatically.
        const response = await axios_1.default.get(url);
        const json = response.data; // The parsed JSON data is in response.data
        // Clean up massive JSON
        const cleanedSteps = json.steps.map((step) => ({
            title: step.title,
            text: step.lines.map((line) => line.text_raw).join("\n"),
            images: step.media.data.map((img) => img.thumbnail)
        }));
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Getting steps to solve",
            status: "completed",
            message: `Steps are Founded with title ${json.title}!`,
            timestamp: Date.now()
        });
        return {
            guideDetails: cleanedSteps,
            finalResponse: json.title
        };
    }
    catch (error) {
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Getting steps to solve",
            status: "error",
            message: `Failed to get Clear steps from iFixit!`,
            timestamp: Date.now()
        });
        // Handle potential network errors or API errors
        console.error(`Error fetching details for guide ID ${guideIdToFind}:`, error.message);
        return { stepData: [], guideTitle: "Error" };
    }
};
exports.guideDetailsNode = guideDetailsNode;
//# sourceMappingURL=iFixit.tools.js.map