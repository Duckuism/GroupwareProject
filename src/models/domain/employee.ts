import {Table, Column, Model} from "sequelize-typescript";

@Table
export default class Employee extends Model<Employee> {

	@Column
	name: string;
}