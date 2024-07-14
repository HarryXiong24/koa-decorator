import { Context, Next } from 'koa';

export default async function error(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = { code: 500, message: 'Internal Server Error', data: null };
  }
}
