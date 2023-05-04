import {
	Controller,
	Get,
	Query,
	Param,
	Post,
	Body,
	Put,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
	CreateMessageDto,
	FilterMessagesDto,
	UpdateMessageDto,
} from '../dtos/messages.dtos';
import { MessagesService } from '../services/messages.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(ApiKeyGuard)
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Public()
	@Get()
	@ApiOperation({ summary: 'List of messages' })
	getMessages(@Query() params: FilterMessagesDto) {
		return this.messagesService.findAll(params);
	}

	@Public()
	@Get('filter')
	getMessageFilter() {
		return `yo soy un filter x`;
	}

	@Public()
	@Get(':messageId')
	getOne(@Param('messageId', MongoIdPipe) messageId: string) {
		return this.messagesService.findOne(messageId);
	}

	@Roles(Role.ADMIN)
	@Post()
	create(@Body() payload: CreateMessageDto) {
		const time = new Date();
		payload.date = time.toISOString();
		//console.log('oe', payload.date.toLocaleTimeString('en-US'));
		return this.messagesService.create(payload); // 👈
	}

	@Put(':id')
	update(
		@Param('id', MongoIdPipe) id: string,
		@Body() payload: UpdateMessageDto,
	) {
		return this.messagesService.update(id, payload); // 👈
	}

	@Delete(':id')
	delete(@Param('id', MongoIdPipe) id: string) {
		return this.messagesService.remove(id); // 👈
	}
}
