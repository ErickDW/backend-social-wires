import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@IsString()
	@IsEmail()
	@ApiProperty({ description: 'the email of user' })
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@Length(6)
	@ApiProperty({ description: "the user' password", deprecated: true })
	readonly password: string;

	@IsNotEmpty()
	readonly role: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'the name of user' })
	readonly userName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: 'the usernick of user' })
	readonly nickName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
