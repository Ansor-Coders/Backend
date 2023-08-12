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
import { Group } from '../../group/models/group.model';

interface TeacherAttr {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  position: string;
  experience: string;
  image_name: string;
  hashed_password: string;
  hashed_token: string;
  is_active: boolean;
  center_id: string;
}

@Table({ tableName: 'teacher' })
export class Teacher extends Model<Teacher, TeacherAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  position: string;

  @Column({ type: DataType.STRING })
  experience: string;

  @Column({ type: DataType.STRING })
  image_name: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  hashed_token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Center)
  @Column({ type: DataType.STRING })
  center_id: string;

  @BelongsTo(() => Center)
  center: Center;

  @HasMany(() => Group, 'teacher_id')
  group_teacher: Group[];

  @HasMany(() => Group, 'assistant_id')
  group_assistant: Group[];
}
