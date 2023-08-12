import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface TelegramAttr {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  real_name: string;
  state: string;
  lang: string;
  is_active: boolean;
}

@Table({ tableName: 'telegram' })
export class Telegram extends Model<Telegram, TelegramAttr> {
  @Column({ type: DataType.STRING, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  user_id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  phone_number: string;

  @Column({ type: DataType.STRING })
  real_name: string;

  @Column({ type: DataType.STRING })
  state: string;

  @Column({ type: DataType.STRING })
  lang: string;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;
}
