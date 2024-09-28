"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
const subcategoryRouter_1 = __importDefault(require("./routes/subcategoryRouter"));
const notesRouter_1 = __importDefault(require("./routes/notesRouter"));
const labelRouter_1 = __importDefault(require("./routes/labelRouter"));
const taskRouter_1 = __importDefault(require("./routes/taskRouter"));
const notifyRouter_1 = __importDefault(require("./routes/notifyRouter"));
class Server {
    constructor() {
        this.app = express();
        // configure application
        this.config();
        // add routes
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.use(bodyParser.json());
    }
    routes() {
        // this.app.get('/db/alter', async (req: any, res: any) => {
        //   console.log(req.params);
        //   /// Database sync : 
        //   // sequelize.sync({ }).then((result: any) => { console.log(result); }) // force :true --delete all data in tabeles.
        //     // sequelize.sync({ alter: true }).then((result: any) => { console.log(result); })
        //     // .catch((err: Error) => { console.log("err...", err); });
        // });
        this.app.use("/auth", authRouter_1.default);
        this.app.use("/category", categoryRouter_1.default);
        this.app.use("/subcategory", subcategoryRouter_1.default);
        this.app.use("/note", notesRouter_1.default);
        this.app.use("/label", labelRouter_1.default);
        this.app.use("/task", taskRouter_1.default);
        this.app.use("/notify", notifyRouter_1.default);
    }
}
exports.Server = Server;
// const PORT :number = 8890;
// app.listen(PORT, () => {
//   console.log('Server is running on port 3000');
// });
