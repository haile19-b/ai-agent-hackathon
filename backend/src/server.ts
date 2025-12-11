import express,{Express,Request,Response} from "express";
import cors from 'cors'

const PORT = process.env.PORT || 5000
const app:Express = express()

app.use(cors())
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"The server started successfully!"
    })
})

app.listen(PORT,()=>{
    console.log(`🚀 server is running on http://localhost:${PORT}`)
})