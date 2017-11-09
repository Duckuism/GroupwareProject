import {Sequelize} from "sequelize-typescript";
import DataSource from "../config/data-source";
import Employee from "./domain/employee";
import Board from "./domain/board";
import Comment from "./domain/comment";

class DatabaseConfig {

	private _sequelize: Sequelize;

	constructor() {
		const sequelize = new Sequelize({
			...new DataSource().getConfig
		});
		sequelize.addModels([Employee, Board, Comment]);
		this._sequelize = sequelize;
	}

	get getSequelize() {
		return this._sequelize;
	}
}

const database = new DatabaseConfig();
export const sequelize = database.getSequelize;