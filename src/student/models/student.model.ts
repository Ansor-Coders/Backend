import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Center } from '../../center/models/center.model';
import { GroupStudent } from '../../group_student/models/group_student.model';

interface StudentAttr {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_additional: string;
  gender: string;
  birth_year: number;
  is_active: boolean;
  center_id: string;
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  phone_additional: string;

  @Column({ type: DataType.STRING })
  gender: string;

  @Column({ type: DataType.SMALLINT })
  birth_year: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Center)
  @Column({ type: DataType.STRING })
  center_id: string;

  @BelongsTo(() => Center)
  center: Center;

  @HasMany(() => GroupStudent)
  groupStudent: GroupStudent[];

  // @HasMany(() => StudentLesson)
  // studentLesson: StudentLesson[];

  // @HasMany(() => StudentPayment)
  // studentPayment: StudentPayment[];
}
