import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Goods } from './Goods';
import { Users } from './User';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @ManyToOne(() => Goods, (good) => good.id)
  good: Goods;

  @Column('int')
  count: number;

  @Column({ type: 'time without time zone' })
  date: any;

  @PrimaryGeneratedColumn('uuid')
  order_id: string;
}
