import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Student } from '../../student/models/student.model';
import { Payment } from '../../payment/models/payment.model';

interface BalanceHistoryAttr {
  id: string;
  money: number;
  is_added: boolean;
  is_active: boolean;
  student_id: string;
}

@Table({ tableName: 'balance_history' })
export class BalanceHistory extends Model<BalanceHistory, BalanceHistoryAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER })
  money: number;

  @Column({ type: DataType.BOOLEAN })
  is_added: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Student)
  @Column({ type: DataType.STRING })
  student_id: string;

  @BelongsTo(() => Student)
  student: Student;

  @HasMany(() => Payment)
  payment: Payment;
}
