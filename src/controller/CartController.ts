import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { appDataSource } from '../data-source';
import { Cart } from '../entity/Cart';

const cartRepository = appDataSource.getRepository(Cart);
export const addToCart = async (request: Request, response: Response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.verify(token, 'someDifficultKey');
    const user_id = (<any>decodedToken).id;
    const { goodId, count } = request.body;
    const good = await appDataSource
      .createQueryBuilder()
      .insert()
      .into(Cart)
      .values({
        count,
        user: user_id,
        good: goodId,
      })
      .execute();
    return response.status(200).json({
      message: 'success',
      good: good[0],
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось добавить товар в корзину',
    });
  }
};

export const getCart = async (request: Request, response: Response) => {
  try {
    const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
    const decodedToken = jwt.verify(token, 'someDifficultKey');
    const user_id = (<any>decodedToken).id;
    const data = [];
    await cartRepository
      .find({
        where: {
          user: user_id,
        },
      })
      .then((result) => result.map((item) => data.push(item)));

    return response.status(200).json({
      message: 'success',
      cart: data,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось получить содержимое корзины',
    });
  }
};
