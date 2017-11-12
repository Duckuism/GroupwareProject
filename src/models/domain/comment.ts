
import {Column, ForeignKey, Table, Model, CreatedAt, UpdatedAt, HasMany} from "sequelize-typescript";
import Board from './board';
import Employee from "./employee";
import CommentToComment from "./commentToComment";

@Table
export default class Comment extends Model<Comment>{
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

    @HasMany(()=> CommentToComment)
    commentToComments : CommentToComment[];

}