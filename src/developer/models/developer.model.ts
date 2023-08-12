import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DeveloperAttr {
  id: string;
  username: string;
  hashed_password: string;
  hashed_token: string;
  is_active: boolean;
}

@Table({ tableName: 'developer' })
export class Developer extends Model<Developer, DeveloperAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  hashed_password: string;

  @Column({ type: DataType.STRING })
  hashed_token: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;
}
