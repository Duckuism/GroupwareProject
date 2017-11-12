import {Table, Column, Model, CreatedAt, UpdatedAt, AllowNull, ForeignKey, HasMany} from 'sequelize-typescript';
import Team from './team';
import Comment from './comment';
import Board from './board';

@Table
export default class Employee extends Model<Employee> {

	@Column
  name: string;

	@Column
  address: string;

	@CreatedAt
	createdAt: Date;

	@UpdatedAt
  updatedAt: Date;

	@ForeignKey(() => Team)
  @Column
  teamId: number;

	@HasMany(()=>Comment)
  Comments : Comment[];

	@HasMany(()=>Board)
  Boards : Board[];
}