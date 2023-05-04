import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { MessagesToDaysService } from '../services/messagesToDay.service';
import { CreateUserDto } from '../dtos/user.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
	constructor(private messagesToDaysService: MessagesToDaysService) {}

	@ApiOperation({
		summary: 'Example roles user',
		description: 'Return messagesToDays by user, use user.nick',
	})
	@Roles(Role.OTHER, Role.ADMIN)
	@Get('my-MessagesToDays')
	getOrders(@Req() req: Request) {
		const user = req.user as PayloadToken;
		return this.messagesToDaysService.messagesToDaysByUsers(user.nick);
	}
}
