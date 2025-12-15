import { agentEvents } from "../config/event.emmiter";
import searchWeb from "../config/tavily";

export const fallbackSearchNode = async(state:any) => {

  agentEvents.emit("progress", {
      node: "Searching Web...",
      status: "started",
      message: "searching for web",
      timestamp: Date.now()
    });

  const res = await searchWeb.search(state.userInput);
  
 try {
   const content = {
    query:res.query,
    results:res.results
  }


  return {
    // Slices the first 3 results from the response
    webSearch:true,
    webResult:content
  };
 } catch (error) {

  agentEvents.emit("progress", {
    node: "getDeviceName",
    status: "error",
    message: "Error occurred searching web!",
    timestamp: Date.now()
  });

  return { webSearch: false, error: error.message };
}
}
