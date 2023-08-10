import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Center } from '../../center/models/center.model';

interface PlanAttr {
  id: string;
  student_amount: number;
  teacher_amount: number;
  group_amount: number;
  is_active: boolean;
}

@Table({ tableName: 'plan' })
export class Plan extends Model<Plan, PlanAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER })
  student_amount: number;

  @Column({ type: DataType.INTEGER })
  teacher_amount: number;

  @Column({ type: DataType.INTEGER })
  group_amount: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @HasMany(() => Center)
  center: Center[];
}
