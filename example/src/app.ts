import { Application } from '../../src/main';

const app = new Application({});

app.listen(3000, () => {
  console.log('server is listening 3000');
});
