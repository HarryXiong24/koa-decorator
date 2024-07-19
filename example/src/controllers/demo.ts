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
