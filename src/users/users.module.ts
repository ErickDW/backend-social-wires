import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { MessagesToDayController } from './controllers/messagesToDay.controller';
import { MessagesToDaysService } from './services/messagesToDay.service';
import {
	MessagesToDay,
	MessagesToDaySchema,
} from './entities/messagesToDay.entity';

import { MessageModule } from '../messages/messages.module';
import { ProfileController } from './controllers/profile.controller';

@Module({
	imports: [
		MessageModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
			{
				name: MessagesToDay.name,
				schema: MessagesToDaySchema,
			},
		]),
	],
	controllers: [UsersController, MessagesToDayController, ProfileController],
	providers: [UsersService, MessagesToDaysService],
	exports: [UsersService],
})
export class UsersModule {}
