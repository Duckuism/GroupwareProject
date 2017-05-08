import {Sequelize} from "sequelize-typescript";
import DataSource from "../config/data-source";
import Employee from "./domain/employee";

class DatabaseConfig {

	private _sequelize: Sequelize;

	constructor() {
		const sequelize = new Sequelize({
			...new DataSource().getConfig
		});
		sequelize.addModels([Employee]);
		this._sequelize = sequelize;
	}

	get getSequelize() {
		return this._sequelize;
	}
}

const database = new DatabaseConfig();
export const sequelize = database.getSequelize;