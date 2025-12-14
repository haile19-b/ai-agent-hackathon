import { Request,Response } from "express"
import prisma from "../config/prisma";
import { agent } from "../agents/graph";
import { fallbackSearchNode } from "../tools/tavily";
import { agentEvents } from "../config/event.emmiter";

export const createChatSession = async(req:Request,res:Response):Promise<Response> => {

    const userId = req.userId

    if(!userId){
        return res.status(400).json({
            success:false,
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


export const chat = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const onProgress = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  agentEvents.on("progress", onProgress);

  const { message } = req.body; 
  const { sessionId } = req.params;

  try {
    const result = await agent.invoke(
      { userInput: message },
      {
        configurable:{
          thread_id:sessionId
        }
      }
    );

    console.log("here is the final summary form the ai ----> ",result)

    res.write(`data: ${JSON.stringify({
      status: "complete",
      finalResponse: result.finalSummary
    })}\n\n`);

  } catch (err:any) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
  } finally {
    agentEvents.off("progress", onProgress);
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