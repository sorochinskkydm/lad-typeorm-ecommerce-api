import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from './entity/User';
import { Roles } from './entity/Roles';
import { Goods, Good_types } from './entity/Goods';
import { Producers } from './entity/Producers';
import { Cart } from './entity/Cart';
import { Orders } from './entity/Orders';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'BrosGriefy1998',
  database: 'node_typeorm',
  logging: false,
  entities: [Users, Roles, Goods, Good_types, Producers, Cart, Orders],
  migrations: [],
});
