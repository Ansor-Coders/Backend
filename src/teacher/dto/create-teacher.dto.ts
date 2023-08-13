import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: '+998991234511',
    description: 'The phone of the Teacher',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    example: 'English teacher',
    description: 'The position of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    example: '6+ years',
    description: 'The experience of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  experience: string;

  @ApiProperty({
    example: 'teacher',
    description: 'The password of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The center ID of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  center_id: string;
}
