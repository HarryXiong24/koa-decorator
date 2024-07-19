import { Application } from '../../src';
import ErrorHandlerFunction from './middlewares/error-handler-function';

const app = new Application({
  controllersDir: './src/controllers',
  middlewaresDir: './src/middlewares',
  servicesDir: './src/services',
  middlewares: [ErrorHandlerFunction],
});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
