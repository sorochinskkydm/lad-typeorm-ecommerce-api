import { appDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { Users } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { requestUserId } from '../utils/checkAuth';
import { validationResult } from 'express-validator';
import { IUser } from '../interfaces/interfaces';

const userRepository = appDataSource.getRepository(Users);
export const registerController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { lastName, firstName, surname, email, user_pass }: IUser = request.body;
    //Проверка существующего email
    const checkEmail = await userRepository.findBy({
      email,
    });
    if (checkEmail.length === 0) {
      //Хэширование пароля
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user_pass, salt);
      //Создание пользователя
      const user = Object.assign(new Users(), {
        firstName,
        lastName,
        surname,
        email,
        user_pass: passwordHash,
      });

      //Сохранение пользователя в БД
      await userRepository.save(user);
      //Создание токена с id пользователя
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role_name,
        },
        'someDifficultKey',
        {
          expiresIn: '30d',
        },
      );

      return response.status(200).json({
        message: 'success',
        ...user,
        token,
      });
    } else {
      return response.status(403).json({
        message: 'Данный адрес уже занят',
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Не удалось зарегистрировать пользователя',
    });
  }
};

export const authController = async (request: Request, response: Response) => {
  try {
    const { email, user_pass }: IUser = request.body;
    //Выборка пользователя из БД
    const user = await userRepository.findBy({
      email,
    });
    //Выборка пароля пользователя
    const passwordHash = await userRepository.find({
      select: {
        user_pass: true,
      },
      where: {
        email,
      },
    });
    if (!user) {
      return response.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    //Сравнение паролей
    const isValidPassword = await bcrypt.compare(user_pass, passwordHash[0].user_pass);
    if (!isValidPassword) {
      return response.status(404).json({
        message: 'Неверный логин или пароль',
      });
    }
    //Создание нового токена при авторизации
    const token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role_name,
      },
      'someDifficultKey',
      {
        expiresIn: '30d',
      },
    );
    response.status(200).json({
      message: 'Успешная авторизация',
      user: user[0],
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(404).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

export const getMeController = async (request: Request, response: Response) => {
  try {
    const user = await userRepository.find({
      where: {
        id: requestUserId,
      },
    });
    return response.status(200).json({
      message: 'success',
      user: user[0],
    });
  } catch (error) {
    console.log(error);
  }
};
// export class UserController {
//   public userRepository = appDataSource.getRepository(Users);
//   async register(request: Request, response: Response, next: NextFunction) {
//     try {
//       console.log(this.userRepository);
//     } catch (error) {
//       console.log(error);
//       response.status(500).json({
//         message: 'Не удалось зарегистрировать пользователя',
//       });
//     }
//   }

//   async one(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     const user = await this.userRepository.findOne({
//       where: { id },
//     });

//     if (!user) {
//       return 'unregistered user';
//     }
//     return user;
//   }

//   async save(request: Request, response: Response, next: NextFunction) {
//     const { firstName, lastName, age } = request.body;

//     const user = Object.assign(new Users(), {
//       firstName,
//       lastName,
//       age,
//     });

//     return this.userRepository.save(user);
//   }

//   async remove(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     let userToRemove = await this.userRepository.findOneBy({ id });

//     if (!userToRemove) {
//       return 'this user not exist';
//     }

//     await this.userRepository.remove(userToRemove);

//     return 'user has been removed';
//   }
// }
