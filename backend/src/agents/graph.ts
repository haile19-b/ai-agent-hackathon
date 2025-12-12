import { Graph } from "@langchain/langgraph";
import { getDeviceName, getRelevantGuide } from "../tools/ai";
import { deviceSearchNode, guideDetailsNode, guideListNode } from "../tools/iFixit.tools";

const graph = new Graph()
  .addNode("findDeviceName",getDeviceName)
  .addNode("deviceSearch", deviceSearchNode)
  .addNode("guideList", guideListNode)
  .addNode("getRelevantGuide",getRelevantGuide)
  .addNode("guideDetails", guideDetailsNode)
  .setEntryPoint("findDeviceName")

  .addEdge("findDeviceName", "deviceSearch")
  .addEdge("deviceSearch", "guideList")
  .addEdge("guideList", "getRelevantGuide")
  .addEdge("getRelevantGuide", "guideDetails")


export const agent = graph.compile();
