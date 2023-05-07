import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import fastifyCookie from '@fastify/cookie';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as cors from 'cors';

async function bootstrap() {

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	await app.register(fastifyCookie, {
		secret: 'my-secret', // for cookies signature
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('API SOCIAL WIRES')
		.setDescription('SOCIAL WIRES is a development backend for testing')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document, {
		customCssUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
		],
	});

	app.enableCors({
		origin: '*',
		methods: ['POST', 'PUT', 'DELETE', 'GET'],
	});

	app.use(
		cors({
			origin: '*',
			methods: ['POST', 'PUT', 'DELETE', 'GET'],
			credentials: true,
		}),
	);
	await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
