import { Middleware } from '../../../src/main';
import { Context, Next } from 'koa';

@Middleware()
export class ErrorHandler {
  async use(ctx: Context, next: Next) {
    try {
      console.log('Error Handler Middleware');
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { code: 500, message: 'Internal Server Error', data: null };
    }
  }
}
