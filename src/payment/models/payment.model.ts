import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { GroupStudent } from '../../group_student/models/group_student.model';

interface PaymentAttr {
  id: string;
  month: string;
  is_active: boolean;
  group_student_id: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  month: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => GroupStudent)
  @Column({ type: DataType.STRING })
  group_student_id: string;

  @BelongsTo(() => GroupStudent)
  groupStudent: GroupStudent;
}
