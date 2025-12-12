import { z } from 'zod'

export const deviceSchema = z.object({
    deviceName: z.string().describe('name of the device that the user is wanting to fix in the format we can get it on the iFixit')
}) 

export type device = z.infer<typeof deviceSchema>