import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MessagesToDay } from '../entities/messagesToDay.entity';
import {
	CreateMessageToDayDto,
	UpdateMessageToDayDto,
} from '../dtos/messagesToDay.dto';

@Injectable()
export class MessagesToDaysService {
	constructor(
		@InjectModel(MessagesToDay.name)
		private messageToDayModel: Model<MessagesToDay>,
	) {}

	findAll() {
		return this.messageToDayModel.find().populate('messages').exec();
	}

	async findOne(id: string) {
		return this.messageToDayModel.findById(id);
	}

	create(data: CreateMessageToDayDto) {
		const newModel = new this.messageToDayModel(data);
		return newModel.save();
	}

	update(id: string, changes: UpdateMessageToDayDto) {
		return this.messageToDayModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec();
	}

	remove(id: string) {
		return this.messageToDayModel.findByIdAndDelete(id);
	}

	async addMessages(id: string, messagesIds: string[]) {
		const messageToDay = await this.messageToDayModel.findByIdAndUpdate(id, {
			$addToSet: { messages: messagesIds },
		});
		if (!messageToDay) {
			throw new NotFoundException(`messageToDay ${id} not found`);
		}

		return await messageToDay.save();
	}
}
