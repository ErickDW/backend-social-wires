/* eslint-disable prettier/prettier */
import {
	IsMongoId,
	IsNotEmpty,
	IsDate,
	IsArray,
	IsOptional,
	IsString,
} from 'class-validator';
import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateMessageToDayDto {
	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty()
	readonly userId: string;

	@IsString()
	@IsOptional()
	@IsDate()
	@ApiProperty()
	date: Date;

	@IsArray()
	@IsNotEmpty()
	@ApiProperty()
	readonly messages: string[];
}

export class UpdateMessageToDayDto extends PartialType(
	OmitType(CreateMessageToDayDto, ['messages']),
) {}

export class AddToMessageToDayDto {
	@IsArray()
	@IsNotEmpty()
	readonly messgesIds: string[];
}
