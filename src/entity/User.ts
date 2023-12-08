import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Roles } from './Roles';
import { Cart } from './Cart';
import { Orders } from './Orders';

export enum UserRole {
  ADMIN = 2,
  USER = 1,
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  lastName: string;

  @Column('varchar', { length: 64 })
  firstName: string;

  @Column('varchar', { length: 64 })
  surname: string;

  @Column('varchar', { length: 64 })
  email: string;

  @Column('varchar', { length: 150 })
  user_pass: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role_name: UserRole;

  @ManyToOne(() => Roles, (role) => role.name)
  role: Roles;

  @OneToMany(() => Orders, (order) => order.id)
  order: Orders;

  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Cart;
}
