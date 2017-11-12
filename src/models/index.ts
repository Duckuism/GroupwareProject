import {Sequelize} from "sequelize-typescript";
import DataSource from "../config/data-source";
import Employee from "./domain/employee";
import Board from "./domain/board";
import Comment from "./domain/comment";
import Team from "./domain/team";
import CommentToComment from "./domain/commentToComment";

class DatabaseConfig {

	private _sequelize: Sequelize;

	constructor() {
		const sequelize = new Sequelize({
			...new DataSource().getConfig
		});
		sequelize.addModels([Employee, Board, Comment, Team, CommentToComment]);
		this._sequelize = sequelize;
	}

	get getSequelize() {
		return this._sequelize;
	}
}

const database = new DatabaseConfig();
export const sequelize = database.getSequelize;