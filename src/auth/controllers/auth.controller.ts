import {
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	login(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
		const user = req.user as User;
		return this.authService.generateJWT(user, response);
	}

	@Get('user')
	async user(@Req() req: Request) {
		const cookie = req.cookies['jwt'];
		if (!cookie) {
			throw new UnauthorizedException('not allow');
		}
		return await this.authService.userJWT(cookie);
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie('jwt');
		return {
			message: 'Succes',
		};
	}
}
