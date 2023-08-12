import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Student',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Student',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone of the Student',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'The phone additional of the Student',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_additional?: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the Student',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    example: 1995,
    description: 'The birth year of the Student',
  })
  @IsNotEmpty()
  @IsNumber()
  birth_year: number;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The center ID of the Student',
  })
  @IsNotEmpty()
  @IsString()
  center_id: string;
}
