import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Goods } from './Goods';
import { Users } from './User';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (user) => user.id)
  user_id: number;

  @OneToMany(() => Goods, (good) => good.id)
  good_id: number;

  @Column('int')
  count: number;

  @PrimaryGeneratedColumn('uuid')
  order_id: string;
}
