import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { Message, MessageSchema } from './entities/message.entity';
@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Message.name,
				schema: MessageSchema,
			},
		]),
	],
	controllers: [MessagesController],
	providers: [MessagesService],
	exports: [MessagesService],
})
export class MessageModule {}
