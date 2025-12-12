import { tavily, TavilyClient  } from "@tavily/core";

const searchWeb:TavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });

export default searchWeb