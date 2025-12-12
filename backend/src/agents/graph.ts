import { Graph } from "@langchain/langgraph";

const graph = new Graph()
  .addNode("deviceSearch", deviceSearchNode)
  .addNode("guideList", guideListNode)
  .addNode("guideDetails", guideDetailsNode)
  .addNode("formatMarkdown", markdownFormatterNode)
  .addNode("fallbackSearch", fallbackSearchNode)
  .addNode("summarizer", summarizerNode)
  .setEntryPoint("deviceSearch")
  
  // Flow
  .addConditionalEdges("deviceSearch", (state) => 
    state.deviceFound ? "guideList" : "fallbackSearch"
  )
  .addConditionalEdges("guideList", (state) => 
    state.guidesFound ? "guideDetails" : "fallbackSearch"
  )
  .addEdge("guideDetails", "formatMarkdown")
  .addEdge("fallbackSearch", "formatMarkdown");

export const agent = graph.compile();
