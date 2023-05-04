import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { MessagesToDaysService } from '../services/messagesToDay.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
@Controller('profile')
export class ProfileController {
	constructor(private messagesToDaysService: MessagesToDaysService) {}

	@Roles(Role.OTHER, Role.ADMIN)
	@Get('my-MessagesToDays')
	getOrders(@Req() req: Request) {
		const user = req.user as PayloadToken;
		return this.messagesToDaysService.messagesToDaysByUsers(user.nick);
	}
}
