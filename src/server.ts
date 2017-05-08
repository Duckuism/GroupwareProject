import {json, urlencoded} from 'body-parser';
import * as express from 'express';
import * as routes from './routes/_index';
import * as logger from "morgan";
import {Express} from "express";
import DbUtils from "./utils/db-utils";

export class Server {

	private app: Express;

	public static bootstrap(): Server {
		return new Server();
	}

	constructor() {

		this.app = express();
		this.dbSyncOnlyDev();
		this.app.use(urlencoded({
			extended: true
		}));
		this.app.use(json());

		this.app.use(logger("dev"));

		//catch 404 and forward to error handler
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			this.handleNotFoundPage(err, next);
		});

		routes.initRoutes(this.app);
	}

	handleNotFoundPage(err: any, next: express.NextFunction) {
		err.status = 404;
		next(err);
	}

	dbSyncOnlyDev(): void {
		DbUtils.syncRun();
	}

	getApp() {
		return this.app;
	}
}