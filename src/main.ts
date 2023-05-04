import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	// app.enableCors({
	// 	origin: 'http://localhost:3000',
	// 	credentials: true,
	// });

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
	SwaggerModule.setup('docs', app, document);

	app.enableCors();
	await app.listen(process.env.PORT || 3000);
}
bootstrap();
