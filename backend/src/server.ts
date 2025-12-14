// src/server.ts

import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotev from 'dotenv';
import authRoute from "./routes/auth.route";
// import chatRoute from "./routes/chat.route"; // Move this import inside start()
import { initializeDatabase } from "./config/stateCheckPointer"; // Keep this import

dotev.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "The server started successfully!"
    });
});

app.use("/auth", authRoute);

const start = async () => {
    try {
        // 1. AWAIT database initialization
        await initializeDatabase();
        console.log("✅ Database and PostgresSaver initialized.");

        // 2. NOW that DB is ready, import modules that depend on `getCheckPointer()`
        // We use dynamic `await import()` or `require()` here if necessary, 
        // but simply moving the definition/import order usually works if done carefully.

        // Assuming chatRoute imports graph.ts internally:
        const chatRoute = await import("./routes/chat.route"); 
        app.use("/chat", chatRoute.default); // Use .default if it's an export default

        // 3. Start the server ONLY after everything is ready
        app.listen(PORT, () => {
            console.log(`🚀 server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1); // Exit if DB connection fails
    }
};

start(); // Call the async start function


app.use("/auth",authRoute)
// app.use("/chat",chatRoute)

app.listen(PORT,async()=>{
    console.log(`🚀 server is running on http://localhost:${PORT}`)
})