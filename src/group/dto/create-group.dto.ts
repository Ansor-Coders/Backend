import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: 'n-77',
    description: 'The name of the Group',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Monday,Tuesday,Friday',
    description: 'The lesson day of the Group',
  })
  @IsNotEmpty()
  @IsString()
  lesson_day: string;

  @ApiProperty({
    example: '10:00-12:00',
    description: 'The lesson time of the Group',
  })
  @IsNotEmpty()
  @IsString()
  lesson_time: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The course ID of the Group',
  })
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The assistant ID of the Group',
  })
  @IsOptional()
  @IsString()
  assistant_id?: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The teacher ID of the Group',
  })
  @IsNotEmpty()
  @IsString()
  teacher_id: string;
}
