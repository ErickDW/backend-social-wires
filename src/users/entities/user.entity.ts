import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	role: string;

	@Prop({ required: true })
	userName: string;

	@Prop({ required: true, unique: true })
	nickName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
