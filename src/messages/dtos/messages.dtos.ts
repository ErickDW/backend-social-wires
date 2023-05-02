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
	@ApiProperty({ description: `message's title` })
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	readonly message: string;

	@IsString()
	@IsOptional()
	@IsDate()
	@ApiProperty()
	date: Date;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	readonly nick: string;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
