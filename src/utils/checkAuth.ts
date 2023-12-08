import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
export let requestUserId = '';
export default async (request: Request, response: Response, next: NextFunction) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'someDifficultKey');
      const requestId: string = (<any>decodedToken).id;
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
