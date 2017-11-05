import {Column, HasMany, Model, Table} from 'sequelize-typescript';
import Employee from './employee';

@Table
export default class Team extends Model<Team> {

  @Column
  name: string;

  @HasMany(() => Employee)
  employees: Employee[];
}