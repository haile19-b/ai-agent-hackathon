// agent/repairAgent.ts
import { StateGraph, functionStateReducer } from "@langchain/langgraph";
// These tools must be updated to accept `AgentState` as input and return `Partial<AgentState>`
import { getDeviceName, getRelevantGuide } from "../tools/ai"; 
import { deviceSearchNode, guideDetailsNode, guideListNode } from "../tools/iFixit.tools";

// 1. Define full state shape that persists across nodes
export interface AgentState {
  userInput: string;          // Original user question passed in .invoke()
  deviceName?: string;        // Extracted device name from LLM
  deviceFound?: boolean;      
  deviceTitle?: string;       // iFixit standard device title
  guides?: any[];             
  selectedGuideId?: number;   // ID of the guide the AI selected
  guideDetails?: any;         // Full step-by-step guide details
  finalResponse?: string;     // The final response message
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
    finalResponse: null
  },
  reducer: functionStateReducer // Uses the standard reducer
});

// 3. Add nodes
workflow
  .addNode("findDeviceName", getDeviceName)
  .addNode("deviceSearch", deviceSearchNode)
  .addNode("guideList", guideListNode)
  .addNode("getRelevantGuide", getRelevantGuide)
  .addNode("fetchGuideDetails", guideDetailsNode);

// 4. Define graph order
workflow
  .setEntryPoint("findDeviceName")
  .addEdge("findDeviceName", "deviceSearch")
  .addEdge("deviceSearch", "guideList")
  .addEdge("guideList", "getRelevantGuide")
  .addEdge("getRelevantGuide", "fetchGuideDetails")

  // --- FIX: Add a finish point ---
  // Assuming 'guideDetails' is the last node that generates the final response
  .setFinishPoint("fetchGuideDetails"); 


// 5. Compile graph to agent
export const agent = workflow.compile();
