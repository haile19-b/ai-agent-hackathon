import zodToJsonSchema from "zod-to-json-schema"
import { genAI } from "../config/genAI"
import { device, deviceSchema, guide, guideSchema } from "../lib/zod"

export const getDeviceName = async(state) => {

    console.log(state.userInput)

    const finalPrompt = `from this user explanation , find out the divice name: 
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

    console.log("here is the device name: ",deviceName)

    return deviceName

}

export const getRelevantGuide = async(state,userInput) => {

    if (!state.guides || state.guides.length === 0) {
    console.error("State does not contain guides.");
    return { stepData: [], guideTitle: "N/A" };
  }

    const content = `form the given list of guides , identify the most relevant guid from the list for the user input. 
    here is the user input: ${userInput}. and here is the list of available guids:${JSON.stringify(state.guides,null,2)}`

    const response = await genAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:content,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:zodToJsonSchema(guideSchema)
        }
    })

    const relevantGUide:guide = JSON.parse(response.text!)

    console.log("hello:",relevantGUide,"how are you:",userInput)

    return relevantGUide

}