
import {Column, Table, Model, HasMany, UpdatedAt, CreatedAt} from "sequelize-typescript";
import Comment from './comment';

@Table
export default class Board extends Model<Board>{
    @Column
    title: string;

    @Column
    content: string;

    @Column
    writer: string;

    @CreatedAt
    createdAt : Date;

    @UpdatedAt
    updatedAt : Date;

    @HasMany(() => Comment)
    comments: Comment[];

}