/* eslint-disable prettier/prettier */
import {
	IsMongoId,
	IsNotEmpty,
	IsArray,
	IsOptional,
	IsString
} from 'class-validator';
import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateMessageDto } from '../../messages/dtos/messages.dtos';

export class CreateMessageToDayDto {
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty({
		description: 'The user id type Mongo for search',
		example: 'Not example',
		type: String,
		name: 'userId',
		title: 'User mongo id'
	})
	readonly userId: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'The user nick for search',
		example: 'Paquito',
		type: String,
		name: 'nick',
		title: 'User nickname'
	})
	readonly nick: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: 'Day this users posts were created',
		example: '20/12/2023',
		type: String,
		name: 'date',
		title: 'Date'
	})
	date: string;

	@IsArray()
	@IsNotEmpty()
	@ApiProperty({
		description: 'List of messages',
		example: '[{message},{message},{mesagge}, ...]',
		type: [CreateMessageDto],
		name: 'messages',
		title: 'List messages',
		isArray: true
	})
	readonly messages: string[];
}

export class UpdateMessageToDayDto extends PartialType(
	OmitType(CreateMessageToDayDto, ['messages']),
) {}

export class AddToMessageToDayDto {
	@IsArray()
	@IsNotEmpty()
	@ApiProperty({
		description: 'The id of the messages created by the user this day',
		example: '[string,string,string, ...]',
		type: [String],
		name: 'messagesIds',
		title: 'Messages ID',
		isArray: true
	})
	readonly messgesIds: string[];
}

export class FilterMessagesToDayDto {
	@IsOptional()
	@ApiProperty({
		description: 'Filter day, messages to day',
		example: '20/12/2023',
		type: String,
		name: 'day',
		title: 'Day filter'
	})
	day: string;
}
