import * as Koa from 'koa';
import { Logger } from 'log4js';

const ErrorHander = {
  init(app: Koa, logger: Logger): void {
    // 捕获内部错误
    app.use(async (ctx: Koa.Context, next: Function) => {
      try {
        await next();
      } catch (e) {
        logger.error(JSON.stringify(e));
        ctx.status = 500;
        ctx.body = '内部错误';
      }
    });
    // 捕获404错误
    app.use(async (ctx: Koa.Context, next: Function) => {
      await next();
      if (ctx.status === 404) {
        ctx.body = '没有找到页面😰...';
      }
    });
  }
};

export default ErrorHander;
