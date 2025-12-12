import searchWeb from "../config/tavity";

export const fallbackSearchNode = async(state: { userInput: string; }) => {
  const res = await searchWeb.search(state.userInput);

  return {
    // Slices the first 3 results from the response
    fallbackResults: res.results.slice(0, 3) 
  };
}
