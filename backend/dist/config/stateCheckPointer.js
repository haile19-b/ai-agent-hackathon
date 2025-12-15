"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPointer = exports.pool = void 0;
const pg_1 = require("pg");
const langgraph_checkpoint_postgres_1 = require("@langchain/langgraph-checkpoint-postgres");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL_NODE
});
console.log("✅ PostgresSaver initialized");
exports.checkPointer = new langgraph_checkpoint_postgres_1.PostgresSaver(exports.pool);
//# sourceMappingURL=stateCheckPointer.js.map