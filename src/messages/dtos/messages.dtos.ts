import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsDate,
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

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	readonly userId: number;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
