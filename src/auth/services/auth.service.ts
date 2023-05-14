import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { FastifyReply } from 'fastify';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);
		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const { password, ...rta } = user.toJSON();
				return rta;
			}
		}
		return null;
	}

	generateJWT(user: User, res: FastifyReply) {
		const payload: PayloadToken = { role: user.role, nick: user.nickName };
		const jwt = this.jwtService.sign(payload);
		return {
			message: 'Succes',
			jwt: jwt,
		};
	}
}
