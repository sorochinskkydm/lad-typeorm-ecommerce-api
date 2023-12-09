import { Request, Response } from 'express';
import { appDataSource } from '../data-source';
import { Users } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { Goods } from '../entity/Goods';
const userRepository = appDataSource.getRepository(Users);
export const getCustomers = async (request: Request, response: Response) => {
  try {
    const data = [];
    (await userRepository.find()).map((item) => data.push(item));
    return response.status(200).json({
      message: 'success',
      ...data,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить список покупателей',
    });
  }
};

export const getCustomerById = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const customer = await userRepository.find({
      where: {
        id,
      },
    });
    response.status(200).json({
      message: 'success',
      customer: customer[0],
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось получить данные покупателя',
    });
  }
};

export const updateCustomer = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    const { lastName, firstName, surname, email, user_pass } = request.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user_pass, salt);
    await appDataSource
      .createQueryBuilder()
      .update(Users)
      .set({
        lastName,
        firstName,
        surname,
        email,
        user_pass: passwordHash,
      })
      .where('id = :id', { id })
      .execute();
    response.status(200).json({
      message: 'successfully updated',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось поменять данные покупателя',
    });
  }
};

export const deleteCustomer = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('id = :id', { id })
      .execute();
    return response.status(200).json({
      message: 'successfully deleted',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось удалить данные покупателя',
    });
  }
};
