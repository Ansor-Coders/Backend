import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { GroupStudent } from '../../group_student/models/group_student.model';

interface LessonAttr {
  id: string;
  date: string;
  is_come: boolean;
  is_active: boolean;
  group_student_id: string;
}

@Table({ tableName: 'lesson' })
export class Lesson extends Model<Lesson, LessonAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.DATEONLY })
  date: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_come: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => GroupStudent)
  @Column({ type: DataType.STRING })
  group_student_id: string;

  @BelongsTo(() => GroupStudent)
  groupStudent: GroupStudent;
}
