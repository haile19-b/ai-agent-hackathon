"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agent = exports.AgentStateAnnotation = void 0;
// agent/repairAgent.ts
const langgraph_1 = require("@langchain/langgraph");
const ai_1 = require("../tools/ai");
const iFixit_tools_1 = require("../tools/iFixit.tools");
const tavily_1 = require("../tools/tavily");
const summary_1 = require("../tools/summary");
const cleanData_1 = require("../tools/cleanData");
const stateCheckPointer_1 = require("../config/stateCheckPointer");
const finish_1 = require("../tools/finish");
// 1. Define the State Annotation (Replaces the old interface and reducer logic)
// In LangGraph.js 2025, this defines both the structure and the merge behavior.
exports.AgentStateAnnotation = langgraph_1.Annotation.Root({
    userInput: (langgraph_1.Annotation),
    deviceName: (langgraph_1.Annotation),
    deviceFound: (langgraph_1.Annotation),
    deviceTitle: (langgraph_1.Annotation),
    guidesFound: (langgraph_1.Annotation),
    guides: (langgraph_1.Annotation),
    selectedGuideId: (langgraph_1.Annotation),
    guideDetails: (langgraph_1.Annotation),
    finalResponse: (langgraph_1.Annotation),
    webSearch: (langgraph_1.Annotation),
    webResult: (langgraph_1.Annotation),
    cleaned: (langgraph_1.Annotation),
    cleanedData: (langgraph_1.Annotation),
    finalData: (langgraph_1.Annotation),
    finalSummary: (langgraph_1.Annotation),
});
// 2. Create StateGraph using the Annotation
const workflow = new langgraph_1.StateGraph(exports.AgentStateAnnotation);
// 3. Add nodes
workflow
    .addNode("findDeviceName", ai_1.getDeviceName)
    .addNode("deviceSearch", iFixit_tools_1.deviceSearchNode)
    .addNode("guideList", iFixit_tools_1.guideListNode)
    .addNode("getRelevantGuide", ai_1.getRelevantGuide)
    .addNode("fetchGuideDetails", iFixit_tools_1.guideDetailsNode)
    .addNode("fallbackSearch", tavily_1.fallbackSearchNode)
    .addNode("cleaniFixitData", cleanData_1.clean_iFixit_Data)
    .addNode("cleanWebsiteData", cleanData_1.clean_tavily_data)
    .addNode("summarizesIFixitTheData", summary_1.summarize)
    .addNode("summarizeWebsearchData", summary_1.summarizeWebsearchData)
    .addNode("FinalNode", finish_1.Final)
    // 4. Define graph order
    .addEdge(langgraph_1.START, "findDeviceName") // Using standard edge for entry point
    .addEdge("findDeviceName", "deviceSearch")
    .addConditionalEdges("deviceSearch", (state) => {
    if (state.deviceFound === false) {
        return "fallbackSearch";
    }
    return "guideList";
})
    .addConditionalEdges("guideList", (state) => {
    if (state.guidesFound === false) {
        return "fallbackSearch";
    }
    return "getRelevantGuide";
})
    .addConditionalEdges("getRelevantGuide", (state) => {
    if (state.selectedGuideId == null) {
        return "fallbackSearch";
    }
    return "fetchGuideDetails";
})
    .addEdge("fetchGuideDetails", "cleaniFixitData")
    .addEdge("cleaniFixitData", "summarizesIFixitTheData")
    .addEdge("fallbackSearch", "cleanWebsiteData")
    .addEdge("cleanWebsiteData", "summarizeWebsearchData")
    .addEdge("summarizeWebsearchData", "FinalNode")
    .addEdge("summarizesIFixitTheData", "FinalNode")
    .addEdge("FinalNode", langgraph_1.END); // Standard finish point
// 5. Compile graph to agent
exports.agent = workflow.compile({
    checkpointer: stateCheckPointer_1.checkPointer,
});
//# sourceMappingURL=graph.js.map