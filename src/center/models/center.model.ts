import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Admin } from '../../admin/models/admin.model';
import { Plan } from '../../plan/models/plan.model';
import { Teacher } from '../../teacher/models/teacher.model';
import { Student } from '../../student/models/student.model';
import { Course } from '../../course/models/course.model';

interface CenterAttr {
  id: string;
  name: string;
  address: string;
  image_name: string;
  is_active: boolean;
  admin_id: string;
  plan_id: string;
}

@Table({ tableName: 'center' })
export class Center extends Model<Center, CenterAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  image_name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ForeignKey(() => Admin)
  @Column({ type: DataType.STRING })
  admin_id: string;

  @ForeignKey(() => Plan)
  @Column({ type: DataType.STRING })
  plan_id: string;

  @BelongsTo(() => Admin)
  admin: Admin;

  @BelongsTo(() => Plan)
  plan: Plan;

  @HasMany(() => Course)
  course: Course[];

  @HasMany(() => Teacher)
  teacher: Teacher[];

  @HasMany(() => Student)
  student: Student[];
}
