import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupStudentDto {
  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The student ID of the Group Student',
  })
  @IsNotEmpty()
  @IsString()
  student_id: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The group ID of the Group Student',
  })
  @IsNotEmpty()
  @IsString()
  group_id: string;
}
