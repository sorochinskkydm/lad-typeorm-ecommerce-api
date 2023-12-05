import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Users } from './User';
import { Goods } from './Goods';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (user) => user.id)
  user_id: number;

  @OneToMany(() => Goods, (good) => good.id)
  good_id: number;

  @Column('int')
  count: number;
}
