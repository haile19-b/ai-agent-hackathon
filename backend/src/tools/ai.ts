import zodToJsonSchema from "zod-to-json-schema"
import { genAI } from "../config/genAI"
import { device, deviceSchema } from "../lib/zod"

export const getDeviceName = async(prompt) => {

    const finalPromt = `from this user explanation , find out the divice name: 
                       here is the user text: ${prompt}`

    const response = await genAI.models.generateContent({
        model:"gemini-2.5-flash",
        contents:finalPromt,
        config:{
            responseMimeType:"application/json",
            responseJsonSchema:zodToJsonSchema(deviceSchema)
        }
    })

    const  deviceName:device = JSON.parse(response.text!)

    return deviceName

}