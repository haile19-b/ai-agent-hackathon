import zodToJsonSchema from "zod-to-json-schema"
import { genAI } from "../config/genAI"
import { deviceSchema, guide, guideSchema } from "../lib/zod"
import { agentEvents } from "../config/event.emmiter";

export const getDeviceName = async (state) => {
  agentEvents.emit("progress", {
    node: "getDeviceName",
    status: "started",
    message: "Identifying device name from user input",
    timestamp: Date.now()
  });

    if(state.deviceName){
    console.log('🚀🚀🚀🚀working! ',state.deviceName)
  }

  // If device already exists AND user likely asking follow-up, skip extraction
  if (state.deviceName && !state.userInput.toLowerCase().includes("replace") &&
      !state.userInput.toLowerCase().includes("change")) {
    return {};
  }

  const finalPrompt = `
From the user input, extract the device name if present.
If no device is mentioned, return null.

User input:
${state.userInput}
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: finalPrompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(deviceSchema)
    }
  });

  const parsed = JSON.parse(response.text!);
  const name = parsed.deviceName;

  if (!name) {
    return {};
  }

  agentEvents.emit("progress", {
    node: "getDeviceName",
    status: "completed",
    message: `Device identified: ${name}`,
    timestamp: Date.now()
  });

  // ✅ Context shift detected → reset downstream state
  if (state.deviceName && name !== state.deviceName) {
    return {
      deviceName: name,
      deviceTitle: null,
      guides: null,
      selectedGuideId: null,
      guideDetails: null,
      cleanedData: null,
      finalResponse: null,
      webResult: null,
      webSearch: false
    };
  }

  // ✅ Same device → just keep it
  return { deviceName: name };
};



export const getRelevantGuide = async(state:any) => {

    agentEvents.emit("progress", {
      node: "Getting Relevant Guide",
      status: "started",
      message: `Tying to get Relevant Guide that match your problem!`,
      timestamp: Date.now()
    });

    console.log("state6: ",state);

    if (!state.guides || state.guides.length === 0) {
        console.error("State does not contain guides.");
        return { selectedGuideId: null, webSearch: true };
    }

const promptContent = `
    FROM the given list of guides, you MUST select the single most relevant guide for the user's input. 
    Do not add any text outside of the JSON object.

    User Input: ${state.userInput}
    List of available guides: ${JSON.stringify(state.guides, null, 2)}
`;

console.log("here is it",JSON.stringify(state.guides,null,2))

    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptContent,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(guideSchema),
        },
    });

    const  relevantGUide:guide = JSON.parse(response.text!)

    try {
        console.log("Selected Guide:", relevantGUide);

    agentEvents.emit("progress", {
      node: "Getting Relevant Guide",
      status: "completed",
      message: `Relevant Guide is Founded`,
      timestamp: Date.now()
    });

        return {
            selectedGuideId: relevantGUide.id ,
            webSearch: false,
        };

    } catch (error) {

    agentEvents.emit("progress", {
      node: "Getting Relevant Guide",
      status: "error",
      message: `Cannot find Relevant data that matches your question`,
      timestamp: Date.now()
    });

        console.error("Failed to parse the model's JSON response:", error);
        return { webSearch: true };
    }
};
