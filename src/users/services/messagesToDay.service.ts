import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MessagesToDay } from '../entities/messagesToDay.entity';
import {
	CreateMessageToDayDto,
	FilterMessagesToDayDto,
	UpdateMessageToDayDto,
} from '../dtos/messagesToDay.dto';

@Injectable()
export class MessagesToDaysService {
	constructor(
		@InjectModel(MessagesToDay.name)
		private messageToDayModel: Model<MessagesToDay>,
	) {}

	async findAll(params?: FilterMessagesToDayDto) {
		if (params) {
			const filters: FilterQuery<MessagesToDay> = {};
			const { day } = params;
			if (day) {
				filters.date = { $regex: day };
			}
			const messageToDay = await this.messageToDayModel
				.find(filters)
				.populate('messages')
				.exec();
			return messageToDay;
		}
		return this.messageToDayModel.find().populate('messages').exec();
	}

	async findOne(id: string) {
		return this.messageToDayModel.findById(id).populate('messages');
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

	async messagesToDaysByUsers(nick: string) {
		const user = await this.messageToDayModel.find({ nick }).exec();
		if (!user) {
			throw new NotFoundException(`userId ${nick} not found`);
		}
		return user;
	}
}
