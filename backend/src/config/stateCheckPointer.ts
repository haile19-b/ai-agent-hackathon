import { Pool } from "pg";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

let checkPointer: PostgresSaver | null = null;

export const initializeDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  pool.on("error", (err) => {
    console.error("Unexpected PG error", err);
  });

  checkPointer = new PostgresSaver(pool);
  await checkPointer.setup();

  console.log("✅ PostgresSaver initialized");

  return checkPointer;
};

export const getCheckPointer = () => {
  if (!checkPointer) {
    throw new Error("Checkpointer not initialized");
  }
  return checkPointer;
};
