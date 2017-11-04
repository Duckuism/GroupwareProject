
import {Column, ForeignKey, Table, Model, ForeignKey, CreatedAt, UpdatedAt} from "sequelize-typescript";
import Board from './board';

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
}