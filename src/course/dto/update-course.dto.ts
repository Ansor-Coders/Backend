import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'English',
    description: 'The name of the Course',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 175000,
    description: 'The price of the Course',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: true,
    description: 'The status of the Course',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
