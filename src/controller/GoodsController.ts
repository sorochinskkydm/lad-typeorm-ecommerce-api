import { Request, Response } from 'express';
import { appDataSource } from '../data-source';
import { Goods } from '../entity/Goods';
import { IGoods } from '../interfaces/interfaces';
import { DataSource } from 'typeorm';

const goodsRepository = appDataSource.getRepository(Goods);

export const getGoods = async (request: Request, response: Response) => {
  try {
    const data = [];
    const goods = await goodsRepository.find();
    goods.map((item) => data.push(item));
    response.json({
      message: 'success',
      goods: data,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить список товаров',
    });
  }
};

export const getGoodById = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const goodById = await goodsRepository.find({
      where: {
        id,
      },
    });
    response.json({
      message: 'success',
      data: goodById[0],
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить товар',
    });
  }
};

export const addGoods = async (request: Request, response: Response) => {
  try {
    const { title, description, type, producer, price } = request.body;
    await appDataSource
      .createQueryBuilder()
      .insert()
      .into(Goods)
      .values([{ title, description, type, producer, price }])
      .execute();
    return response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось добавить товар',
    });
  }
};

export const updateGoods = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const { title, producer_id, type_id, price, description } = request.body;
    await appDataSource
      .createQueryBuilder()
      .update(Goods)
      .set({
        title,
        producer_id,
        type_id,
        price,
        description,
      })
      .where('id = :id', { id })
      .execute();
    response.status(200).json({
      message: 'successfully updated',
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось обновить товар',
    });
  }
};

export const removeGoods = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Goods)
      .where('id = :id', { id })
      .execute();
    return response.status(200).json({
      message: 'successfully deleted',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить товар',
    });
  }
};
