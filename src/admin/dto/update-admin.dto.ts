import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Admin',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Admin',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone of the Admin',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: 'john77',
    description: 'The username of the Admin',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the Admin',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: true,
    description: 'The status of the Admin',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
