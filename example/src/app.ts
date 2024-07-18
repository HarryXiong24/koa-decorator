import { Application } from '../../src/main';
// import ErrorHandlerFunction from './middlewares/error-handler-function';

// const app = new Application({
//   middlewares: [ErrorHandlerFunction],
// });

const app = new Application({
  controllersDir: './controllers',
  middlewaresDir: './ middlewares',
  servicesDir: './services',
});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
