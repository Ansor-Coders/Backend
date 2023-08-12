import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'English',
    description: 'The name of the Course',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 175000,
    description: 'The price of the Course',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The center ID of the Course',
  })
  @IsNotEmpty()
  @IsString()
  center_id: string;
}
