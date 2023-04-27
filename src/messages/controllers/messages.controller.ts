import {
	Controller,
	Get,
	Query,
	Param,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateMessageDto, UpdateMessageDto } from '../dtos/messages.dtos';
import { MessagesService } from '../services/messages.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private messagesService: MessagesService) {}

	@Get()
	@ApiOperation({ summary: 'List of messages' })
	getMessages(
		@Query('limit') limit = 100,
		@Query('offset') offset = 0,
		@Query('brand') brand: string,
	) {
		// return {
		//   message: `messages limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
		// };
		return this.messagesService.findAll();
	}

	@Get('filter')
	getMessageFilter() {
		return `yo soy un filter`;
	}

	@Get(':messageId')
	@HttpCode(HttpStatus.ACCEPTED)
	getOne(@Param('messageId', ParseIntPipe) messageId: number) {
		// response.status(200).send({
		//   message: `message ${messageId}`,
		// });
		return this.messagesService.findOne(messageId);
	}

	@Post()
	create(@Body() payload: CreateMessageDto) {
		// return {
		//   message: 'accion de crear',
		//   payload,
		// };
		return this.messagesService.create(payload);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() payload: UpdateMessageDto) {
		return this.messagesService.update(+id, payload);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.messagesService.remove(+id);
	}
}
