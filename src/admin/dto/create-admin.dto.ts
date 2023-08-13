import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998991234511',
    description: 'The phone of the Admin',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'john11',
    description: 'The username of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'admin',
    description: 'The password of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
