import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CreateMessageToDayDto } from '../dtos/messagesToDay.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@ApiHeader({
	name: 'Auth',
	example: 'ABC123',
	description: 'in local or dev is ABC123',
})
@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@ApiOperation({
		summary: 'List of users',
		description: 'Return list of users',
	})
	@ApiResponse({
		type: [CreateUserDto],
	})
	async findAll() {
		return await this.usersService.findAll();
	}

	@ApiOperation({
		summary: 'ID User search',
		description: 'Return data user',
	})
	@ApiResponse({
		type: CreateUserDto,
	})
	@Get(':id')
	get(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@ApiOperation({
		summary: 'User messages per day',
		description: 'Return user messages per days',
	})
	@ApiResponse({
		type: CreateMessageToDayDto,
	})
	@Get(':id/MessagesToDays')
	getMessagesToDays(@Param('id') id: string) {
		return this.usersService.getMessagesToDaysByUser(id);
	}

	@ApiOperation({
		summary: 'Create User or register user',
		description: 'Return user data create, omit password',
	})
	@ApiResponse({
		type: CreateUserDto,
	})
	@Post()
	create(@Body() payload: CreateUserDto) {
		return this.usersService.create(payload);
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: 'Update User',
		description: 'Return update data user',
	})
	@ApiResponse({
		type: CreateUserDto,
	})
	@Put(':id')
	update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
		return this.usersService.update(id, payload);
	}

	@UseGuards(JwtAuthGuard)
	@ApiOperation({
		summary: 'Delete User',
		description: 'Return delete user',
	})
	@ApiResponse({
		type: CreateUserDto,
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
