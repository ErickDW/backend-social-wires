import { Injectable, NotFoundException } from '@nestjs/common';

import { Message } from './../entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './../dtos/messages.dtos';

@Injectable()
export class MessagesService {
	private counterId = 1;
	private messages: Message[] = [
		{
			id: 1,
			userId: 1000,
			title: 'Titulo del mensaje',
			message: 'lorem lorem',
			date: new Date(),
		},
	];

	findAll() {
		return this.messages;
	}

	findOne(id: number) {
		const message = this.messages.find((item) => item.id === id);
		if (!message) {
			throw new NotFoundException(`Message #${id} not found`);
		}
		return message;
	}

	create(data: CreateMessageDto) {
		this.counterId = this.counterId + 1;
		const newMessage = {
			id: this.counterId,
			...data,
		};
		this.messages.push(newMessage);
		return newMessage;
	}

	update(id: number, changes: UpdateMessageDto) {
		const message = this.findOne(id);
		const index = this.messages.findIndex((item) => item.id === id);
		this.messages[index] = {
			...message,
			...changes,
		};
		return this.messages[index];
	}

	remove(id: number) {
		const index = this.messages.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new NotFoundException(`Message #${id} not found`);
		}
		this.messages.splice(index, 1);
		return true;
	}
}
