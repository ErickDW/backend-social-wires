import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsDate,
	IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'The message title',
		example: 'Titulo mensaje para todos',
		name: 'title',
		title: 'Title message',
		type: String,
	})
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'The content message',
		example: 'Aqui va el contenido de un mensaje, nunca te rindas',
		name: 'message',
		title: 'Content Message',
		type: String,
	})
	readonly message: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Date message',
		example: '20/12/2023',
		name: 'date',
		title: 'Date message',
		type: String,
	})
	date: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The user nickname in message',
		example: 'Paquito',
		name: 'nick',
		title: 'User nickname',
		type: String,
	})
	readonly nick: string;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}

export class FilterMessagesDto {
	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'Filter messages per nickname',
		example: 'Paquito',
		name: 'nick',
		title: 'Filter nickname',
		type: String,
	})
	nick: string;

	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'Filter messages per title',
		example: 'Titulo mensaje para todos',
		name: 'title',
		title: 'Filter title',
		type: String,
	})
	title: string;

	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'Filter messages per date',
		example: '20-12-2023',
		name: 'day',
		title: 'Filter date',
		type: String,
	})
	day: string;
}
