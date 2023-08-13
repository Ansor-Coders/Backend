import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { GroupStudent } from '../../group_student/models/group_student.model';
import { Teacher } from '../../teacher/models/teacher.model';
import { Course } from '../../course/models/course.model';

interface GroupAttr {
  id: string;
  name: string;
  lesson_day: string;
  lesson_time: string;
  is_active: boolean;
  course_id: string;
  assistant_id: string;
  teacher_id: string;
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  lesson_day: string;

  @Column({ type: DataType.STRING })
  lesson_time: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Course)
  @Column({ type: DataType.STRING })
  course_id: string;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.STRING })
  assistant_id: string;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.STRING })
  teacher_id: string;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Teacher, { foreignKey: 'assistant_id' })
  assistant: Teacher;

  @BelongsTo(() => Teacher, { foreignKey: 'teacher_id' })
  teacher: Teacher;

  @HasMany(() => GroupStudent)
  groupStudent: GroupStudent[];
}
