import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
	getHello(req?: Request): string {
		if (!req) {
			return 'Hello World!';
		}
		return `Hello World! this api doc in
		"${req.protocol}://${req.get('host')}${req.originalUrl}docs"`;
	}
}
