import { Context, Next } from 'koa';
import DemoInjectable from '../utils/demo';
export declare class ErrorHandler {
    demoInjectable: DemoInjectable;
    use(ctx: Context, next: Next): Promise<void>;
}
