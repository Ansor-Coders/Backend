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

interface CourseAttr {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
  center_id: string;
}

@Table({ tableName: 'course' })
export class Course extends Model<Course, CourseAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Center)
  @Column({ type: DataType.STRING })
  center_id: string;

  @BelongsTo(() => Center)
  center: Center;

  @HasMany(() => Group)
  group: Group[];
}
