// agent/repairAgent.ts
import { StateGraph, functionStateReducer } from "@langchain/langgraph";
// These tools must be updated to accept `AgentState` as input and return `Partial<AgentState>`
import { getDeviceName, getRelevantGuide } from "../tools/ai"; 
import { deviceSearchNode, guideDetailsNode, guideListNode } from "../tools/iFixit.tools";
import { fallbackSearchNode } from "../tools/tavily";
import { summarize } from "../tools/summary";
import { clean_iFixit_Data, clean_tavily_data } from "../tools/cleanData";
import { checkPointer } from "../config/stateCheckPointer";

// 1. Define full state shape that persists across nodes
export interface AgentState {
  userInput: string;          // Original user question passed in .invoke()
  deviceName?: string;        // Extracted device name from LLM
  deviceFound?: boolean;      
  deviceTitle?: string;       // iFixit standard device title
  guidesFound?:boolean;
  guides?: any[];             
  selectedGuideId?: number;   // ID of the guide the AI selected
  guideDetails?: any;         // Full step-by-step guide details
  finalResponse?: string;     // The final response message
  webSearch?:boolean;
  webResult?:object;
  cleaned?:boolean;
  cleanedData?:object;
  finalData?:object;
  finalSummary?:object;
}

// 2. Create StateGraph with merging reducer
// Note: We use the reducer imported from the library directly.
const workflow = new StateGraph<AgentState>({
  channels: {
    userInput: null,
    deviceName: null,
    deviceFound: null,
    deviceTitle: null,
    guides: null,
    selectedGuideId: null,
    guideDetails: null,
    finalResponse: null,
    webSearch: null,
    webResult: null,
    cleaned: null,
    cleanedData:null,
    finalData:null,
    finalSummary:null
  },
  reducer: functionStateReducer // Uses the standard reducer
});

// 3. Add nodes
workflow
  .addNode("findDeviceName", getDeviceName)
  .addNode("deviceSearch", deviceSearchNode)
  .addNode("guideList", guideListNode)
  .addNode("getRelevantGuide", getRelevantGuide)
  .addNode("fetchGuideDetails", guideDetailsNode)
  .addNode("fallbackSearch", fallbackSearchNode)
  .addNode("cleaniFixitData",clean_iFixit_Data)
  .addNode("cleanWebsiteData",clean_tavily_data)
  .addNode("summarizesTheData",summarize)

// 4. Define graph order
workflow
  .setEntryPoint("findDeviceName")
  .addEdge("findDeviceName", "deviceSearch")
  .addConditionalEdges("deviceSearch",(state) => {
      if (state.deviceFound === false){
         return "fallbackSearch";
      }
      return "guideList";
    }
  )
.addConditionalEdges("guideList",(state) => {
      if (state.guidesFound === false){
         return "fallbackSearch";
      }
      return "getRelevantGuide";
    }
  )  
  .addConditionalEdges("getRelevantGuide",(state)=> {
    if(state.selectedGuideId == null){
      return "fallbackSearch"
    }
    return "fetchGuideDetails"
   }
  )
  .addEdge("fetchGuideDetails","cleaniFixitData")
  .addEdge("cleaniFixitData","summarizesTheData")

  .addEdge("fallbackSearch","cleanWebsiteData")
  .addEdge("cleanWebsiteData","summarizesTheData")

  // --- FIX: Add a finish point ---
  // Assuming 'guideDetails' is the last node that generates the final response
  .setFinishPoint("summarizesTheData");


// 5. Compile graph to agent
export const agent = workflow.compile({
  checkpointer: checkPointer,
});
