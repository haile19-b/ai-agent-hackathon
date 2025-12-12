import searchWeb from "../config/tavily";

export const fallbackSearchNode = async(state) => {
  console.log("////this is current state: ",state)
  const res = await searchWeb.search(state.userInput);
  
 try {
   const content = {
    query:res.query,
    results:res.results
  }

  // console.log("this is the webResult---> ",content)

  return {
    // Slices the first 3 results from the response
    webSearch:true,
    webResult:content
  };
 } catch (error) {
  return { webSearch: false, error: error.message };
}
}
