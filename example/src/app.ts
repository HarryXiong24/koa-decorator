import Application from 'koa-decorator-x';
// import ErrorHandlerFunction from './middlewares/error-handler-function';

// const app = new Application({
//   middlewares: [ErrorHandlerFunction],
// });

const app = new Application({
  controllersDir: '/src/controllers',
  middlewaresDir: '/src/middlewares',
  servicesDir: '/src/services',
});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
