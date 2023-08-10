import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Center } from '../../center/models/center.model';

interface AdminAttr {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  image_name: string;
  username: string;
  hashed_password: string;
  hashed_token: string;
  is_active: boolean;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  image_name: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  hashed_token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @HasMany(() => Center)
  center: Center[];
}
