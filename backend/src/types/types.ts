export interface AgentEvent {
  node: string;
  status: "started" | "completed" | "error";
  message: string;
  timestamp: number;
}