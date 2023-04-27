import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {
	constructor(
		@Inject('MONGO') private database: Db,
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
	) {}

	getHello(): string {
		const apiKey = this.configService.apiKey;
		return `Hello World! ${apiKey}`;
	}

	// getMessages() {
	// 	const messageCollection = this.database.collection('message');
	// 	return messageCollection.find().toArray();
	// }
}
