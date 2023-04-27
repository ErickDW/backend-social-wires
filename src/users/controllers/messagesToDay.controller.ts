import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessagesToDaysService } from '../services/messagesToDay.service';
import {
	CreateMessageToDayDto,
	UpdateMessageToDayDto,
	AddToMessageToDayDto,
} from '../dtos/messagesToDay.dto';

@ApiTags('messagesToDays')
@Controller('messagesToDays')
export class MessagesToDayController {
	constructor(private messagesToDaysService: MessagesToDaysService) {}

	@Get()
	findAll() {
		return this.messagesToDaysService.findAll();
	}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.messagesToDaysService.findOne(id);
	}

	@Post()
	create(@Body() payload: CreateMessageToDayDto) {
		const time = new Date();
		payload.date = new Date(`${time.toISOString()}`);
		//console.log('oe', payload.date.toLocaleTimeString('en-US'));
		return this.messagesToDaysService.create(payload);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() payload: UpdateMessageToDayDto) {
		return this.messagesToDaysService.update(id, payload);
	}

	@Put(':id/messages')
	updateMessages(
		@Param('id') id: string,
		@Body() payload: AddToMessageToDayDto,
	) {
		return this.messagesToDaysService.addMessages(id, payload.messgesIds);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.messagesToDaysService.remove(id);
	}

	@Delete(':id/message/:messageId')
	removeMessage(
		@Param('id') id: string,
		@Param('messageId') messageId: string,
	) {
		return this.messagesToDaysService.removeMessage(id, messageId);
	}
}
