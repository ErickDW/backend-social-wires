import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
	@Prop({ required: true, index: true })
	nick: string;

	@Prop({ required: true, type: String })
	title: string;

	@Prop({ required: true, type: String })
	message: string;

	@Prop({ required: true, type: String, index: true })
	date: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
