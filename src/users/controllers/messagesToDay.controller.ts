import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessagesToDaysService } from '../services/messagesToDay.service';
import {
	CreateMessageToDayDto,
	UpdateMessageToDayDto,
	AddToMessageToDayDto,
} from '../dtos/messagesToDay.dto';
import { FilterMessagesDto } from '../../messages/dtos/messages.dtos';

@ApiTags('MessagesToDays')
@Controller('messagesToDays')
export class MessagesToDayController {
	constructor(private messagesToDaysService: MessagesToDaysService) {}

	@Get()
	findAll(@Query() params: FilterMessagesDto) {
		return this.messagesToDaysService.findAll(params);
	}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.messagesToDaysService.findOne(id);
	}

	@Post()
	create(@Body() payload: CreateMessageToDayDto) {
		const time = new Date();
		payload.date = time.toISOString();
		//console.log('oe', payload.date.toLocaleTimeString('en-US'));
		return this.messagesToDaysService.create(payload);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() payload: UpdateMessageToDayDto) {
		return this.messagesToDaysService.update(id, payload);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.messagesToDaysService.remove(id);
	}

	@Put(':id/messages')
	updateMessages(
		@Param('id') id: string,
		@Body() payload: AddToMessageToDayDto,
	) {
		return this.messagesToDaysService.addMessages(id, payload.messgesIds);
	}
}
