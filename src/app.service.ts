import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AppService {
	getHello(req?: FastifyRequest): string {
		if (!req) {
			return 'Hello World!';
		}
		return `Hello World! this api doc in
		"${req.protocol}://${req.hostname}${req.url}docs"`;
	}
}
