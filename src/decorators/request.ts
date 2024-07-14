import { Context } from 'koa';
import { RequestMethod } from '../types/request';
import Container from '../container';

export function Request(path: string, method: RequestMethod) {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const handler = descriptor.value; // example handler = async function(ctx: Context) {}
    descriptor.value = async function (ctx: Context) {
      const result = await handler.call(this);
      ctx.body = result;
    };

    Container.registerRouter({
      path,
      method,
      serviceIdentifier: target.constructor.name,
      methodName: key,
    });
  };
}

export function GET(path: string) {
  return Request(path, RequestMethod.GET);
}

export function POST(path: string) {
  return Request(path, RequestMethod.POST);
}

export function PUT(path: string) {
  return Request(path, RequestMethod.PUT);
}

export function DELETE(path: string) {
  return Request(path, RequestMethod.DELETE);
}

export function DEL(path: string) {
  return Request(path, RequestMethod.DEL);
}

export function HEAD(path: string) {
  return Request(path, RequestMethod.HEAD);
}

export function OPTIONS(path: string) {
  return Request(path, RequestMethod.OPTIONS);
}
