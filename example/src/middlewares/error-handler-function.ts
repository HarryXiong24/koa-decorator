import { Context, Next } from 'koa';

export default async function ErrorHandlerFunction(ctx: Context, next: Next) {
  try {
    console.log('Error Handler Middleware Function Mode is running');
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = { code: 500, message: 'Internal Server Error', data: null };
  }
}
