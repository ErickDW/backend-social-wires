/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from './user.entity';
import { Message } from '../../messages/entities/message.entity';

@Schema()
export class MessagesToDay extends Document {
	@Prop({ type: String })
	date: string;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	userId: User | Types.ObjectId;

	@Prop({ type: [{ type: Types.ObjectId, ref: Message.name }] })
	messages: Types.Array<Message>;
}

export const MessagesToDaySchema = SchemaFactory.createForClass(MessagesToDay);
