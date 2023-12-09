import { appDataSource } from './data-source';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as UserController from './controller/UserController';
import * as GoodsController from './controller/GoodsController';
import * as CustomersController from './controller/CustomersController';
import checkAuth from './utils/checkAuth';
import checkRole from './utils/checkRole';
// import { Routes } from './routes';

//Initializing connection to DB
appDataSource
  .initialize()
  .then(async () => {
    // create express app
    const PORT = process.env.PORT || 8080;
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     async (request: Request, response: Response, next: Function) => {
    //       const result = await new (route.controller as any)()[route.action](
    //         request,
    //         response,
    //         next,
    //       );
    //       response.json('hi');
    //     },
    //   );
    // });

    // setup express app here
    // ...

    //Auth&Register routes
    app.post('/api/auth/register', UserController.registerController);
    app.post('/api/auth/login', checkAuth, UserController.authController);
    app.get('/api/users/me', checkAuth, UserController.getMeController);

    //Goods routes
    app.get('/api/goods', GoodsController.getGoods);
    app.get('/api/goods/:id', GoodsController.getGoodById);

    //Admin goods routes
    app.post('/api/goods', checkAuth, checkRole, GoodsController.addGoods);
    app.put('/api/goods/:id', checkAuth, checkRole, GoodsController.updateGoods);
    app.delete('/api/goods/:id', checkAuth, checkRole, GoodsController.removeGoods);

    //Admin customers routes
    app.get('/api/customers', checkAuth, checkRole, CustomersController.getCustomers);
    app.get('/api/customers/:id', checkAuth, checkRole, CustomersController.getCustomerById);
    app.put('/api/customers/:id', checkAuth, checkRole, CustomersController.updateCustomer);
    app.delete('/api/customers/:id', checkAuth, checkRole, CustomersController.deleteCustomer);

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port.`);
    });
  })
  .catch((error) => console.log('Something went wrong with AppDataSource', error));
