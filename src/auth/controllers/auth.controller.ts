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
	async user(@Req() req: Request) {
		const cookie = req.cookies['jwt'];
		if (!cookie) {
			throw new UnauthorizedException('not allow');
		}
		return await this.authService.userJWT(cookie);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@ApiOperation({
		summary: 'Logout',
		description: 'Return succes logout user',
	})
	async logout(@Res({ passthrough: true }) response: FastifyReply) {
		response.cookie('jwt', '', { httpOnly: true, path: '/' });
		return {
			message: 'Succes',
		};
	}
}
