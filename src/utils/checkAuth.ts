import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
export let requestUserId = 0;
export default async (request: Request, response: Response, next: NextFunction) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'someDifficultKey');
      const requestId: number = (<any>decodedToken).id;
      requestUserId = requestId;
      next();
    } catch (error) {
      console.log(error);
      return response.status(403).json({
        message: 'Ошибка токена',
      });
    }
  } else {
    return response.status(401).json({
      message: 'Ошибка авторизации',
    });
  }
};
