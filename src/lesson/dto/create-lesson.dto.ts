import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({
    example: '2023-08-10',
    description: 'The date of the Lesson in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The group student ID of the Lesson',
  })
  @IsNotEmpty()
  @IsString()
  group_student_id: string;
}
