import { Application } from '../../src/main';
import ErrorHandlerFunction from './middlewares/error-handler-function';

const app = new Application({
  middlewares: [ErrorHandlerFunction],
});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
