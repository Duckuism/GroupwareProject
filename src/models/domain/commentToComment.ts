
import {Column, ForeignKey, Table, Model, CreatedAt, UpdatedAt} from "sequelize-typescript";
import Board from './board';
import Employee from "./employee";
import Comment from "./comment";

@Table
export default class CommentToComment extends Model<CommentToComment>{
  @Column
  content: string;

  @Column
  writer: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @ForeignKey(() => Comment)
  @Column
  commentId: number;

}