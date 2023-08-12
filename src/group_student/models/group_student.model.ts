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
import { Group } from '../../group/models/group.model';
import { Lesson } from '../../lesson/models/lesson.model';
import { Payment } from '../../payment/models/payment.model';

interface GroupStudentAttr {
  id: string;
  is_active: boolean;
  student_id: string;
  group_id: string;
}

@Table({ tableName: 'group_student' })
export class GroupStudent extends Model<GroupStudent, GroupStudentAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Student)
  @Column({ type: DataType.STRING })
  student_id: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.STRING })
  group_id: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Group)
  group: Group;

  @HasMany(() => Lesson)
  lesson: Lesson[];

  @HasMany(() => Payment)
  payment: Payment[];
}
