import zodToJsonSchema from "zod-to-json-schema";
import { genAI } from "../config/genAI"
import { aiFinalResponseSchema, steps } from "../lib/zod";

export const summarize = async(state) => {

    console.log("here is the final Data -----> ",state.cleanedData)
    
    // The content structure should only contain user/model turns
    const content = [
       {
        role: "user",
        // Combine the user input and the final data into a single user message
        parts: [{ text: `
            Here is the relevant data about the item:
            ${JSON.stringify(state.cleanedData,null,2)}
            
            Based on the data above, please address the following user request:
            ${state.userInput}
        `}],
      },
    ];

    // The system instruction goes into the config object
    const config = {
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(aiFinalResponseSchema),
            // Use the dedicated parameter for system instructions
            systemInstruction: "You are responsible for returning correct and structured information on how to fix the item based solely on the given content. Do not add conversational filler."
        }
    };

    const buffer = await genAI.models.generateContent(config);

    let finalSummary: steps;
    
    try {
      finalSummary = JSON.parse(buffer.text!);
    } catch (err) {
      throw new Error("AI returned invalid JSON:\n" + buffer.text);
    }    
    // Return the complete summary string
    return {finalSummary:finalSummary};
}