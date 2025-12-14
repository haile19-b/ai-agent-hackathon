import { Pool } from "pg";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL_NODE
});

console.log("✅ PostgresSaver initialized")

export const checkPointer = new PostgresSaver(pool);
