"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const stateCheckPointer_1 = require("./config/stateCheckPointer");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const startApp = async () => {
    try {
        await stateCheckPointer_1.checkPointer.setup();
        console.log("✅ Database and PostgresSaver initialized.");
    }
    catch (error) {
        console.log("❌ Failed to setUp the checkPointer!", error);
    }
};
startApp();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allows any origin by reflecting it back
        callback(null, true);
    },
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "The server started successfully!"
    });
});
app.use("/auth", auth_route_1.default);
app.use("/chat", chat_route_1.default);
app.listen(PORT, () => {
    console.log(`🚀 server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map