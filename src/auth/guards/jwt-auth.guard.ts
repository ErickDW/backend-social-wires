import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
		if (isPublic) {
			return true;
		}
		const request: Request = context.switchToHttp().getRequest();
		const cookie = request.cookies['jwt'];
		if (!cookie) {
			throw new UnauthorizedException('not allow');
		}
		return super.canActivate(context);
	}
}
