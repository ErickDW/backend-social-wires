import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Req() res?: FastifyRequest): string {
		const msg = this.appService.getHello(res);
		return msg;
	}
}
