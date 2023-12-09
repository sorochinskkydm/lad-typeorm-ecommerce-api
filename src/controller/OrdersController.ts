import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { v1 } from 'uuid';
import { appDataSource } from '../data-source';
import { Cart } from '../entity/Cart';
import { Orders } from '../entity/Orders';
import { NumericType } from 'typeorm';

const cartRepository = appDataSource.getRepository(Cart);
const orderRepository = appDataSource.getRepository(Orders);

export const createAnOrder = async (request: Request, response: Response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.verify(token, 'someDifficultKey');
    const user_id = (<any>decodedToken).id;
    let data = [];
    const cart = await cartRepository.find({
      where: {
        user: user_id,
      },
    });
    console.log(cart);
    cart.map((item) =>
      data.push({
        count: item.count,
        order_id: v1(),
        userId: item.user,
        goodId: item.good,
        date: new Date().toISOString(),
      }),
    );
    console.log(data);

    data.forEach(async (item) => {
      const toOrder = await appDataSource.createQueryBuilder().insert().into(Orders).values({
        count: item.count,
        order_id: item.order_id,
        user: item.userId,
        good: item.goodId,
        date: item.date,
      });
    });
    console.log(data);

    data = null;
    console.log(data);
    await appDataSource.createQueryBuilder().delete().from(Cart).where('id = :id', { user_id });

    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось сформировать заказ',
    });
  }
};

export const getOrdersById = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const data = [];
    const orders = await orderRepository.find({
      where: {
        id,
      },
    });
    orders.map((item) => data.push(item));
    return response.status(200).json({
      message: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить список заказов',
    });
  }
};

export const getOrders = async (request: Request, response: Response) => {
  try {
    const data = [];
    const orders = await orderRepository.find();
    orders.map((item) => data.push(item));
    return response.status(200).json({
      message: 'success',
      data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить список заказов',
    });
  }
};

export const updateOrder = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const { userId, count } = request.body;
    await appDataSource.createQueryBuilder().update(Orders).set({ userId, count, id });
    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось обновить заказ',
    });
  }
};

export const deleteOrder = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    await appDataSource.createQueryBuilder().delete().from(Orders).where('id = :id', { id });
    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить заказ',
    });
  }
};
