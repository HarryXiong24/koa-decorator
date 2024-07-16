export default async function ErrorHandlerFunction(ctx: any, next: any) {
  try {
    console.log('Error Handler Middleware');
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = { code: 500, message: 'Internal Server Error', data: null };
  }
}
