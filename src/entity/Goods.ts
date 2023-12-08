import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Producers } from './Producers';
import { Cart } from './Cart';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  title: string;

  @ManyToOne(() => Producers, (producer) => producer.producer_name)
  producer: Producers;

  @ManyToOne(() => Good_types, (type) => type.type_name)
  type: Good_types;

  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Cart;

  @Column('text')
  description: string;

  @Column('int')
  price: number;
}

@Entity()
export class Good_types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  type_name: string;

  @OneToMany(() => Goods, (good) => good.title)
  good: Goods;
}
