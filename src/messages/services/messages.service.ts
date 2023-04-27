import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from './../entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './../dtos/messages.dtos';

@Injectable()
export class MessagesService {
	constructor(
		@InjectModel(Message.name) private messageModel: Model<Message>,
	) {}

	findAll() {
		return this.messageModel.find().exec();
	}

	async findOne(id: string) {
		const message = await this.messageModel.findById(id).exec();
		if (!message) {
			throw new NotFoundException(`Message #${id} not found`);
		}
		return message;
	}

	create(data: CreateMessageDto) {
		const newMessge = new this.messageModel(data);
		return { not: 'Message create', dat: newMessge.save() };
	}

	update(id: string, changes: UpdateMessageDto) {
		const message = this.messageModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec();
		if (!message) {
			throw new NotFoundException(`Product #${id} not found`);
		}
		return { not: 'Message update', dat: message };
	}

	remove(id: string) {
		return this.messageModel.findByIdAndDelete(id);
	}
}
