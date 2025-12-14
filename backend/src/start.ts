import { initializeDatabase } from "./config/stateCheckPointer";

export const startApplication = async() => {
  try {
    await initializeDatabase();

    console.log("Application starting up...");

  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1); // Exit if DB connection fails
  }
}