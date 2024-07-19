import { Inject, Middleware } from 'koa-decorator-x';
import { Context, Next } from 'koa';
import DemoInjectable from '../utils/demo';

@Middleware()
export class ErrorHandlerClass {
  @Inject()
  demoInjectable!: DemoInjectable;

  async use(ctx: Context, next: Next) {
    try {
      console.log('Error Handler Middleware Class Mode is running');
      console.log('result', await this.demoInjectable.index());
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { code: 500, message: 'Internal Server Error', data: null };
    }
  }
}
