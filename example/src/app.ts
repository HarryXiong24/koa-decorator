import { Application } from '../../src/main';
import ErrorHandler from './middleware/error-handler';

const app = new Application({
  middlewares: [ErrorHandler],
});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
