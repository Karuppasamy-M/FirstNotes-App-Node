import express = require('express');
import * as bodyParser from 'body-parser';
import authRouter from './routes/authRouter';
import categoryRouter from './routes/categoryRouter';
import subCategoryRouter from './routes/subcategoryRouter';
import notesRouter from './routes/notesRouter';
import labelRouter from './routes/labelRouter';
import taskRouter from './routes/taskRouter';
import notifyRouter from './routes/notifyRouter';
import { sequelize } from './models/models';

export class Server {
  public app: any;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  public config() {
    this.app.use(bodyParser.json());
  }

  private routes() {


    /// Temporary testing routes 
    this.app.get('/db/alter', async (req: any, res: any) => {
      console.log(req.params);
      /// Database sync : 
      sequelize.sync({}).then((result: any) => { console.log(result); }) // force :true --delete all data in tabeles.
      // sequelize.sync({ alter: true }).then((result: any) => { console.log(result); })
      // .catch((err: Error) => { console.log("err...", err); });
    });

    this.app.post('/connection/check', async (req: any, res: any) => {
      res.send({ "status": "connected new" });
    });
    /// Temporary testing routes --end

    this.app.use("/auth", authRouter);
    this.app.use("/category", categoryRouter);
    this.app.use("/subcategory", subCategoryRouter);
    this.app.use("/note", notesRouter);
    this.app.use("/label", labelRouter);
    this.app.use("/task", taskRouter);
    this.app.use("/notify", notifyRouter);
  }
}


