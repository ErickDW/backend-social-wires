import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.srategy';
import config from '../config';
import { AllowCors } from './services/cors';

@Module({
	providers: [AuthService, LocalStrategy, JwtStrategy, AllowCors],
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			inject: [config.KEY],
			useFactory: (configService: ConfigType<typeof config>) => {
				return {
					secret: configService.jwtSecret,
					signOptions: { expiresIn: '2d' },
				};
			},
		}),
	],
	controllers: [AuthController],
})
export class AuthModule {}
