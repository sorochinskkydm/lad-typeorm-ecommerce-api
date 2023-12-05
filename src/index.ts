import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';

//Initializing connection to DB
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (request: Request, response: Response, next: Function) => {
          const result = await new (route.controller as any)()[route.action](
            request,
            response,
            next,
          );
          response.json('hi');
        },
      );
    });

    // setup express app here
    // ...

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port.`);
    });
  })
  .catch((error) => console.log('Something went wrong with AppDataSource', error));
