import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: `message's title` })
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly message: string;

	@IsDate()
	@IsNotEmpty()
	readonly date: Date;

	@IsNumber()
	@IsNotEmpty()
	readonly userId: number;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
