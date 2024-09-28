
import { Sequelize } from 'sequelize';
import * as SequelizeStatic from 'sequelize';
import { configs } from '../common/dbConfigs/configs';
import { databaseConfig } from '../common/dbConfigs/dbConfiguration';
import user, { UserModelStatic } from './user';
import category, { CategoryModelStatic } from './category';
import subCategory, { SubCategoryModelStatic } from './subCategory';
import notes, { NotesModelStatic } from './notes';
import label, { LabelModelStatic } from './label';
import noteLabels, { NoteLabelsModelStatic } from './noteLabel';
import task, { TaskModelStatic } from './task';
import notify, { NotifyModelStatic } from './notify';
import commonError, { CommonErrorModelStatic } from './logs/errorLog';
import priority, { PriorityModelStatic } from './priority';

export interface SequelizeModels {
    sequelize: Sequelize;

    User: UserModelStatic;
    Category: CategoryModelStatic;
    SubCategory: SubCategoryModelStatic;
    Notes: NotesModelStatic;
    Label: LabelModelStatic;
    NoteLabels: NoteLabelsModelStatic
    Task: TaskModelStatic;
    Priority: PriorityModelStatic;
    Notify: NotifyModelStatic;
    CommonError: CommonErrorModelStatic

}



export class Database {
    private sequelizeStatic: any;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;



    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }

    constructor(databaseName: string) {
        this.sequelizeStatic = SequelizeStatic;
        let dbConfig = configs.getDatabaseConfig();

        dbConfig.database = databaseName;
        dbConfig.timezone = '+00:00';
        console.log(dbConfig);

        // if (dbConfig.logging) {
        //   dbConfig.logging = logger.info;
        // }

        // if (!config.get('isLive')) {
        //   dbConfig.logging = console.log;
        // }

        var sequelize = new this.sequelizeStatic(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            dbConfig);

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
            User: user(this._sequelize),
            Category: category(this._sequelize),
            SubCategory: subCategory(this._sequelize),
            Notes: notes(this._sequelize),
            Label: label(this._sequelize),
            NoteLabels: noteLabels(this._sequelize),
            Task: task(this._sequelize),
            Priority: priority(this._sequelize),
            Notify: notify(this._sequelize),
            CommonError: commonError(this._sequelize),

        }
    }


    initAssociations(models: SequelizeModels) {
        models.User.hasMany(models.Category, { foreignKey: 'user_id' });
        models.User.hasMany(models.Notes, { sourceKey: 'id', foreignKey: 'user_id' });

        models.Category.hasMany(models.SubCategory, { sourceKey: 'category_id' as 'categoryId', foreignKey: 'category_id' });

        models.SubCategory.hasMany(models.Notes, { sourceKey: 'sub_category_id' as 'subCategoryId', foreignKey: 'sub_category_id' });
        models.SubCategory.hasMany(models.Task, { sourceKey: 'sub_category_id' as 'subCategoryId', foreignKey: 'sub_category_id' });

        models.Notes.belongsTo(models.User, { foreignKey: 'user_id' });
        models.Notes.belongsTo(models.Priority, { foreignKey: 'note_priority_id' });
        // models.Notes.hasMany(models.Notify,{foreignKey: 'note_id'});

        models.Task.belongsTo(models.Priority, { foreignKey: 'task_priority_id' });

        models.Notes.belongsToMany(models.Label, { through: models.NoteLabels, foreignKey: 'note_id', otherKey: 'note_id' });
        models.Label.belongsToMany(models.Notes, { through: models.NoteLabels, foreignKey: 'label_id', otherKey: 'label_id' });
        // models.Task.hasMany(models.Notify,{foreignKey: 'task_id'});


    }
}

const database = new Database(databaseConfig.database);
export const models = database.getModels();
export const sequelize = database.getSequelize();
export const associations = database.initAssociations(models);