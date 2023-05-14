import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FastifyReply } from 'fastify';
import { PayloadToken } from '../models/token.model';
@ApiTags('Auth')
@UseGuards(ApiKeyGuard)
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	@ApiOperation({
		summary: 'Login',
		description: 'User login',
	})
	login(
		@Req() req: Request,
		@Res({ passthrough: true }) response: FastifyReply,
	) {
		const user = req.user as User;
		return this.authService.generateJWT(user, response);
	}

	@Get('user')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: 'JWT token',
		description: 'Return info user token jwt',
	})
	user(@Req() req: Request) {
		const user = req.user as PayloadToken;
		return user;
	}
}


// export const environment = {
// 	production: true,
// 	apiEndPoint: '',
// 	apiKey: 'ABC123TProd',
// 	urlServices: 'https://backend-social-wires.vercel.app',
// 	environment: 'production',
// };
