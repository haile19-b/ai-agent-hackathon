import {GoogleGenAI} from '@google/genai'
import dotenv from 'dotenv'

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

export const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY!});