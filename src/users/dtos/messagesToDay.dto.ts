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
	@ApiProperty()
	date: string;

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

export class FilterMessagesToDayDto {
	@IsOptional()
	day: string;
}
