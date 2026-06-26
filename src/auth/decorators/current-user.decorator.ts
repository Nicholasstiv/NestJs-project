import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../interfaces/payload.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Payload => {
    const request = ctx.switchToHttp().getRequest<{ user: Payload }>();

    return request.user;
  },
);
