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
exports.associations = exports.sequelize = exports.models = exports.Database = void 0;
const SequelizeStatic = __importStar(require("sequelize"));
const configs_1 = require("../common/dbConfigs/configs");
const dbConfiguration_1 = require("../common/dbConfigs/dbConfiguration");
const user_1 = __importDefault(require("./user"));
const category_1 = __importDefault(require("./category"));
const subCategory_1 = __importDefault(require("./subCategory"));
const notes_1 = __importDefault(require("./notes"));
const label_1 = __importDefault(require("./label"));
const noteLabel_1 = __importDefault(require("./noteLabel"));
const task_1 = __importDefault(require("./task"));
const notify_1 = __importDefault(require("./notify"));
const errorLog_1 = __importDefault(require("./logs/errorLog"));
const priority_1 = __importDefault(require("./priority"));
class Database {
    getModels() {
        return this._models;
    }
    getSequelize() {
        return this._sequelize;
    }
    constructor(databaseName) {
        this.sequelizeStatic = SequelizeStatic;
        let dbConfig = configs_1.configs.getDatabaseConfig();
        dbConfig.database = databaseName;
        dbConfig.timezone = '+00:00';
        console.log(dbConfig);
        // if (dbConfig.logging) {
        //   dbConfig.logging = logger.info;
        // }
        // if (!config.get('isLive')) {
        //   dbConfig.logging = console.log;
        // }
        var sequelize = new this.sequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._sequelize = sequelize;
        this._sequelize
            .authenticate()
            .then(() => {
            console.log('Database Connection has been established successfully.');
        })
            .catch(err => {
            console.log(JSON.stringify(err));
            console.error('Unable to connect to the database:', err);
        });
        this._models = {
            sequelize,
            User: (0, user_1.default)(this._sequelize),
            Category: (0, category_1.default)(this._sequelize),
            SubCategory: (0, subCategory_1.default)(this._sequelize),
            Notes: (0, notes_1.default)(this._sequelize),
            Label: (0, label_1.default)(this._sequelize),
            NoteLabels: (0, noteLabel_1.default)(this._sequelize),
            Task: (0, task_1.default)(this._sequelize),
            Priority: (0, priority_1.default)(this._sequelize),
            Notify: (0, notify_1.default)(this._sequelize),
            CommonError: (0, errorLog_1.default)(this._sequelize),
        };
    }
    initAssociations(models) {
        models.User.hasMany(models.Category, { foreignKey: 'user_id' });
        models.User.hasMany(models.Notes, { sourceKey: 'id', foreignKey: 'user_id' });
        models.Category.hasMany(models.SubCategory, { sourceKey: 'category_id', foreignKey: 'category_id' });
        models.SubCategory.hasMany(models.Notes, { sourceKey: 'sub_category_id', foreignKey: 'sub_category_id' });
        models.SubCategory.hasMany(models.Task, { sourceKey: 'sub_category_id', foreignKey: 'sub_category_id' });
        models.Notes.belongsTo(models.User, { foreignKey: 'user_id' });
        models.Notes.belongsTo(models.Priority, { foreignKey: 'note_priority_id' });
        models.Notes.belongsTo(models.Priority, { foreignKey: 'task_priority_id' });
        // models.Notes.belongsToMany(models.Label, { through: models.NoteLabels });
        models.Label.belongsToMany(models.Notes, { through: models.NoteLabels, foreignKey: 'note_id', otherKey: 'label_id' });
    }
}
exports.Database = Database;
const database = new Database(dbConfiguration_1.databaseConfig.database);
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
exports.associations = database.initAssociations(exports.models);
