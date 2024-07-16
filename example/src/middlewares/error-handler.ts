import { Inject, Middleware } from '../../../src/main';
import { Context, Next } from 'koa';
import DemoService from '../services/demo';

@Middleware()
export class ErrorHandler {
  @Inject()
  demoService!: DemoService;

  async use(ctx: Context, next: Next) {
    try {
      console.log('Error Handler Middleware');
      console.log(this.demoService.index());
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { code: 500, message: 'Internal Server Error', data: null };
    }
  }
}
