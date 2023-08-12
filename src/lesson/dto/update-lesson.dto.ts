import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateLessonDto {
  @ApiProperty({
    example: '2023-08-10',
    description: 'The date of the Lesson in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    example: true,
    description: 'The attendence status of the Lesson',
  })
  @IsOptional()
  @IsBoolean()
  is_come?: boolean;

  @ApiProperty({
    example: true,
    description: 'The status of the Lesson',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
