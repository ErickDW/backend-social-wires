import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { MessageModule } from '../messages/messages.module';

@Module({
	imports: [MessageModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
