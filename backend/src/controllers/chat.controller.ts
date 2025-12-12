import { Request,Response } from "express"
import prisma from "../config/prisma";
import { agent } from "../agents/graph";
import { fallbackSearchNode } from "../tools/tavily";
export const createChatSession = async(req:Request,res:Response):Promise<Response> => {

    const userId = req.userId

    if(!userId){
        return res.status(400).json({
            seccess:false,
            message:"user in not authenticated!"
        })
    }

    try {
        
        const session = await prisma.chatSession.create({
            data:{
                userId:userId
            }
        })

        return res.status(200).json({
            success:true,
            sessionId:session.id
        })

    } catch (error:any) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }

}

export const chat = async (req: Request, res: Response): Promise<Response | void> => {
 
//   Send a message every 3 seconds
//   const interval = setInterval(() => {
//     res.write(`data: "Hello World!"\n\n`);
//   }, 3000);

//  Example loop sending 5 messages
//  for (let i = 0; i < 5; i++) {
//  res.write(`data: hello ${i}\n\n`);
//   }

//   Stop the stream after 15 seconds
//   setTimeout(() => {
//     clearInterval(interval);
//     res.end();
//   }, 15000);

res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");
res.setHeader("Access-Control-Allow-Origin", "*"); // Needed for cross-origin frontend requests
res.flushHeaders?.();

res.write(`data: {"status": "connected", "clientId": "Haile"}\n\n`);


const { message } = req.body;
const { sessionId } = req.params;

if (!message || !sessionId) {
        // We cannot use res.status(400).json() here because we already sent SSE headers.
        res.write(`event: error\n`);
        res.write(`data: {"error": "No message or sessionID provided."}\n\n`);
        // We end the stream manually in case of input error now.
        return res.end(); 
    }

try {
        res.write(`data: {"chatStatus": "Saving the Message on Database..."}\n\n`);

        const savedMassage = await prisma.message.create({
            data: {
                sessionId,
                role: 'USER',
                content: message,
                order: 1
            }
        });

        res.write(`data: {"chatStatus": "Message saved successfully!", "messageId": "${savedMassage.id}"}\n\n`);

        // --- End of message processing trial ---

        // If you want the trial to automatically end after processing the message, you can call res.end() here:
         res.write(`data: {"status": "process_complete"}\n\n`);
         res.end(); 

    } catch (error) {
        console.error(error);
        res.write(`event: error\n`);
        res.write(`data: {"error": "Database operation failed."}\n\n`);
        res.end();
    }

};

export const trial = async(req:Request,res:Response):Promise<Response>=>{
    const {prompt} = req.body;

    const result = await agent.invoke({ userInput: prompt });

    return res.status(200).json({
        success:true,
        response:result
    })

    // const response = await getDeviceName(prompt)
    

    // return res.status(200).json({
    //     name:response.device_name
    // })

    // const device_name = "HP Pavilion"

    // const response = await guideListNode(device_name)
    // console.log(response.guides)

    // const aiResponse = await getRelevantGuide(response.guides,prompt)
    // console.log("ai",aiResponse)

    // return res.status(200).json({
    //     response:aiResponse
    // })

}


export const google = async(req:Request,res:Response):Promise<Response> => {
    const {questions} = req.body;
    const result =  await fallbackSearchNode(questions)

    return res.status(200).json({
        result
    })
}