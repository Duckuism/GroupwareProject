
import {Column, Table, Model, HasMany, UpdatedAt, CreatedAt, ForeignKey} from "sequelize-typescript";
import Comment from './comment';
import Employee from "./employee";
import CommentToComment from "./commentToComment";

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


    // TODO: 이미 board랑 comment랑 되어있는데 꼭 이렇게 관계설정을 다시 해주어야 하나?
    // @HasMany(() => CommentToComment)
    // commentToComments: CommentToComment[];

    @ForeignKey(() => Employee)
    @Column
    employeeId: number;
}