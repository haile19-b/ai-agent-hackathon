import * as z from 'zod/v3'

export const deviceSchema = z.object({
    deviceName: z.string().describe('name of the device that the user is wanting to fix in the format we can get it on the iFixit')
}) 

export type device = z.infer<typeof deviceSchema>


export const guideSchema = z.object({
    id:z.number().describe("the unique id for the guide"),
    relevantGuid:z.string().describe("the most relevant guide to the users input to solve users problem")
})

export type guide = z.infer<typeof guideSchema>

export const stepSchema = z.object({
    title:z.string().describe("text that can be title for the step"),
    description:z.string().describe("clear statement that describe the step"),
    image:z.array(z.string()).describe("array of image urls in correct order")
})

export const aiFinalResponseSchema = z.object({
    steps:z.array(stepSchema).describe("this is array of the steps")
})

export type steps = z.infer<typeof aiFinalResponseSchema>

export const webDataSummarySchema = z.object({
    title:z.string().describe("thi is the over title for the response"),
    shortSummary:z.string().describe("this is the summary of the result"),
    url:z.array(z.string()).describe("this is the collection of url optained from the web-search!")
})

export type webData = z.infer<typeof webDataSummarySchema>