import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateStudentDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Student',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Student',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: '+998991234511',
    description: 'The phone of the Student',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    example: '+998991234511',
    description: 'The phone additional of the Student',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_additional?: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the Student',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    example: 1995,
    description: 'The birth year of the Student',
  })
  @IsOptional()
  @IsNumber()
  birth_year?: number;
}
