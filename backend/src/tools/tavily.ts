import searchWeb from "../config/tavily";

export const fallbackSearchNode = async(state) => {
  const res = await searchWeb.search(state.userInput);

  return {
    // Slices the first 3 results from the response
    fallbackResults: res.results.slice(0, 3) 
  };
}
