import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Message } from './../entities/message.entity';
import {
	CreateMessageDto,
	FilterMessagesDto,
	UpdateMessageDto,
} from './../dtos/messages.dtos';

@Injectable()
export class MessagesService {
	constructor(
		@InjectModel(Message.name) private messageModel: Model<Message>,
	) {}
	async findAll(params?: FilterMessagesDto) {
		if (params) {
			const filters: FilterQuery<Message> = {};
			const { nick, title, day } = params;
			if (nick) {
				filters.nick = { $regex: nick, $options: 'i' };
			}
			if (title) {
				filters.title = { $regex: title, $options: 'i' };
			}
			if (day) {
				filters.date = { $regex: day };
			}
			const messages = await this.messageModel.find(filters).exec();
			return messages;
		}
		return this.messageModel.find().exec();
	}

	async findNick(nick: string) {
		const messages = await this.messageModel
			.find({ nick: { $regex: nick } })
			.exec();
		return messages.sort((a, b) => {
			return a.nick.toLowerCase().length - b.nick.toLowerCase().length;
		});
	}

	async findOne(id: string) {
		const message = await this.messageModel.findById(id).exec();
		if (!message) {
			throw new NotFoundException(`Message #${id} not found`);
		}
		return message;
	}

	async create(data: CreateMessageDto) {
		const newMessge = new this.messageModel(data);
		const msg = await newMessge.save();
		return { not: 'Message create', dat: msg.toJSON() };
	}

	update(id: string, changes: UpdateMessageDto) {
		return this.messageModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec()
			.then((res) => {
				if (!res) {
					throw new NotFoundException(`Message #${id} not found`);
				}

				return { not: 'Message update', message: res.toJSON() };
			});
	}

	remove(id: string) {
		return this.messageModel.findByIdAndDelete(id);
	}
}
