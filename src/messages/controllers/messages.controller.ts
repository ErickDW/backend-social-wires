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

import { CreateMessageDto, UpdateMessageDto } from '../dtos/messages.dtos';
import { MessagesService } from '../services/messages.service';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@UseGuards(ApiKeyGuard)
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Public()
	@Get()
	@ApiOperation({ summary: 'List of messages' })
	getMessages(
		@Query('limit') limit = 100,
		@Query('offset') offset = 0,
		@Query('brand') brand: string,
	) {
		return this.messagesService.findAll();
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

	@Post()
	create(@Body() payload: CreateMessageDto) {
		const time = new Date();
		payload.date = new Date(`${time.toISOString()}`);
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
