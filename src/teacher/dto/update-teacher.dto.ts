import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Teacher',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Teacher',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone of the Teacher',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: 'English teacher',
    description: 'The position of the Teacher',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    example: '6+ years',
    description: 'The experience of the Teacher',
  })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the Teacher',
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
