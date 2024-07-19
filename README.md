# koa-decorator

## Description

Koa-decorator is a package that provides a set of decorators to simplify the creation and management of routes in Koa.js applications.

These decorators allow you to define routes, middlewares and services directly, making your code cleaner and more maintainable.

## Install

For npm:

```bash
npm install koa-decorator-x
```

For pnpm:

```bash
pnpm install koa-decorator-x
```

For yarn:

```bash
yarn add koa-decorator-x
```

## Usage

### Easy run the server:

```ts
import { Application } from 'koa-decorator-x';

const app = new Application();

app.listen(3000, () => {
  console.log('server is listening 3000');
});
s;
```

### Directory conventions

In the root directory, we have these directories by default:

```bash
.
├── controllers
│   ├── xxxController.ts
│   ├── xxxController.ts
├── middlewares
│   ├── xxx.ts
│   ├── xxx.ts
├── services
│   ├── xxx.ts
│   ├── xxx.ts
└── app.ts
```

And our framework will scan the files in these directories automatically. So we have to make sure these directories exists.

If you want to modify the structure of default directories. Please modify the config synchronously.

```ts
import { Application } from 'koa-decorator-x';

const app = new Application({
  controllersDir: '/src/controllers',
  middlewaresDir: '/src/middlewares',
  servicesDir: '/src/services',
  middlewares: [],
});
```

### Define routers

We have already pre-installed `@koa/router`.

You do not need to define routers by using a `router.get('/list', handleList)`.

Instead, you just need to create a controller class in `controllers` directory. And the use `@Controller`, `@GET`, `@POST` etc. The router will be register automatically.

```ts
import { Controller, GET, POST } from 'koa-decorator-x';

@Controller('/demo')
export default class DemoController {
  @GET('/list')
  public async list(ctx: Context): Promise<Result> {
    return { code: 0, data: data, msg: 'OK' };
  }

  @POST('/update')
  public async update(): Promise<Result> {
    return { code: 0, data: [], msg: 'OK' };
  }
}
```

## Define middlewares

You just need to create a middleware class in `middlewares` directory. And the use `@Middleware` to define a middleware. The middleware will be register automatically.

```ts
import { Inject, Middleware } from 'koa-decorator-x';
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
```

At the same time, you can also apply third-party middlewares by registering in the `Application`:

```ts
import { Application } from 'koa-decorator-x';

const app = new Application({
  controllersDir: '/src/controllers',
  middlewaresDir: '/src/middlewares',
  servicesDir: '/src/services',
  middlewares: [],
});
```

### Service & Injectable

They are the same concept and just use different name. Service is focused on some services you need to provide. Injectable just the class you want to have inject function.

First, use `@Service` to register a service class.

```ts
import { Service } from 'koa-decorator-x';
@Service()
export default class DemoService {
  public async index(): Promise<
    {
      id: string;
      name: string;
      gender: string;
    }[]
  > {
    return [
      { id: '11111', name: 'harry', gender: 'male' },
      { id: '22222', name: 'peter', gender: 'female' },
    ];
  }
}
```

And then, you can inject it to any class instances.

```ts
import Result from '../models/result';
import { Controller, GET, Inject, POST } from 'koa-decorator-x';
import DemoService from '../services/demo';
import { Context } from 'koa';

@Controller('/demo')
export default class DemoController {
  @Inject()
  demoService!: DemoService;

  @GET('/list')
  public async list(ctx: Context): Promise<Result> {
    const data = await this.demoService.index();
    return { code: 0, data: data, msg: 'OK' };
  }

  @POST('/update')
  public async update(): Promise<Result> {
    return { code: 0, data: [], msg: 'OK' };
  }
}
```

`Injectable` is the same.

```ts
import { Injectable } from 'koa-decorator-x';

@Injectable()
class DemoInjectable {
  public async index(): Promise<
    {
      id: string;
      name: string;
      gender: string;
    }[]
  > {
    return [
      { id: '11111', name: 'harry', gender: 'male' },
      { id: '22222', name: 'peter', gender: 'female' },
    ];
  }
}

export default DemoInjectable;
```

```ts
import { Inject, Middleware } from 'koa-decorator-x';
import { Context, Next } from 'koa';
import DemoInjectable from '../utils/demo';

@Middleware()
export class ErrorHandler {
  @Inject()
  demoInjectable!: DemoInjectable;

  async use(ctx: Context, next: Next) {
    try {
      console.log('Error Handler Middleware');
      console.log('result', await this.demoInjectable.index());
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { code: 500, message: 'Internal Server Error', data: null };
    }
  }
}
```

## Contributing

We welcome contributions!

## License

This project is licensed under the MIT License. See the LICENSE file for details.
