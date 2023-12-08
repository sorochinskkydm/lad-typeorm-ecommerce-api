import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Users } from './User';
import { Goods } from './Goods';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  // @ManyToOne(() => Goods, (good) => good.id)
  // good: Goods;

  @ManyToOne(() => Goods, (good) => good.id)
  good: Goods;

  @Column('int')
  count: number;
}
