import Result from '../models/result';
import DemoService from '../services/demo';
import { Context } from 'koa';
export default class DemoController {
    demoService: DemoService;
    list(ctx: Context): Promise<Result>;
    update(): Promise<Result>;
}
