import express,{Express,Request,Response} from "express";
import cors from 'cors'
import dotev from 'dotenv'
import authRoute from "./routes/auth.route";
import chatRoute from "./routes/chat.route";
import { checkPointer } from "./config/stateCheckPointer";

dotev.config();

const startApp = async() => {
    try {
        await checkPointer.setup();
        console.log("✅ Database and PostgresSaver initialized.")
    } catch (error) {
        console.log("❌ Failed to setUp the checkPointer!",error)
    }
}

startApp()

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

app.use("/auth",authRoute)
app.use("/chat",chatRoute)

app.listen(PORT,()=>{
    console.log(`🚀 server is running on http://localhost:${PORT}`)
})