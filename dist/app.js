"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(config_1.MONGODB_URL)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
});
