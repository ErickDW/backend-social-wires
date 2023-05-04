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
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiHeader,
} from '@nestjs/swagger';

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
@UseGuards(JwtAuthGuard, ApiKeyGuard)
@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Public()
	@Get()
	@ApiOperation({
		summary: 'Get all messages or get all messages per fillters',
		description: 'Return array messages',
	})
	@ApiResponse({
		type: [CreateMessageDto],
	})
	getMessages(@Query() params: FilterMessagesDto) {
		return this.messagesService.findAll(params);
	}

	@Public()
	@Get(':messageId')
	@ApiOperation({
		summary: 'Get message per message ID',
		description: 'Return message',
	})
	@ApiResponse({
		type: CreateMessageDto,
	})
	getOne(@Param('messageId', MongoIdPipe) messageId: string) {
		return this.messagesService.findOne(messageId);
	}

	@Post()
	@ApiBearerAuth()
	@ApiHeader({
		name: 'Auth',
		example: 'ABC123',
		description: 'in local or dev is ABC123',
	})
	@ApiOperation({
		summary: 'Create message',
		description: 'Create new message',
	})
	@ApiResponse({
		type: CreateMessageDto,
	})
	create(@Body() payload: CreateMessageDto) {
		const time = new Date();
		payload.date = time.toISOString();
		//console.log('oe', payload.date.toLocaleTimeString('en-US'));
		return this.messagesService.create(payload); // 👈
	}

	@Put(':id')
	@ApiBearerAuth()
	@ApiHeader({
		name: 'Auth',
		example: 'ABC123',
		description: 'in local or dev is ABC123',
	})
	@ApiOperation({
		summary: 'Update message',
		description: 'Update message',
	})
	update(
		@Param('id', MongoIdPipe) id: string,
		@Body() payload: UpdateMessageDto,
	) {
		return this.messagesService.update(id, payload); // 👈
	}

	@Delete(':id')
	@ApiBearerAuth()
	@ApiHeader({
		name: 'Auth',
		example: 'ABC123',
		description: 'in local or dev is ABC123',
	})
	@ApiOperation({
		summary: 'Delete message',
		description: 'Delete message',
	})
	@ApiResponse({
		type: CreateMessageDto,
	})
	delete(@Param('id', MongoIdPipe) id: string) {
		return this.messagesService.remove(id); // 👈
	}
}
