
import {Column, Table, Model, HasMany} from "sequelize-typescript";
//음 잘은 모르겠지만.. 일단 여기는 애노테이션 태그를
// sequelize-typescript라는 패키지에서 import한다는 설정문인듯
import Comment from './comment';
// 그리고 여기는 관계 설정하려면 관계 설정하는 모델의 데이터들을 활용할 수 있어야되서
// 관계설정할 모델파일 경로를 import하는 것 같다.

@Table
//db테이블을 만든단 소리.
export default class Board extends Model<Board>{
//요기는 잘 모르겠다 안의 내용은 스키마의 컬럼을 만든다는 얘기 같고.
    @Column
    name: string;

    @Column
    content: string;

    @Column
    writer: string;


    @HasMany(() => Comment)
    comment: Comment[];
    //여기가 현재 Board 파일에서 Comment 파일과 관계설정 해주는 부분
}