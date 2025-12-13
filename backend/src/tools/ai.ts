import zodToJsonSchema from "zod-to-json-schema"
import { genAI } from "../config/genAI"
import { device, deviceSchema, guide, guideSchema } from "../lib/zod"

export const getDeviceName = async(state) => {

    console.log(state.userInput)

    const finalPrompt = `from this user explanation , find out the deviceName: 
                       here is the user text: ${state.userInput}`

    const response = await genAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:finalPrompt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:zodToJsonSchema(deviceSchema)
        }
    })

    const  deviceName:device = JSON.parse(response.text!)

    const name = deviceName.deviceName

    console.log("state1: ",state)

    return {deviceName:name}

}


export const getRelevantGuide = async(state) => {
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
    Don't forget to select once.
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

        return {
            selectedGuideId: relevantGUide.id ,
            webSearch: false,
        };

    } catch (error) {
        console.error("Failed to parse the model's JSON response:", error);
        return { webSearch: true };
    }
};
