import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    example: 'n-77',
    description: 'The name of the Group',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Monday,Tuesday,Friday',
    description: 'The lesson day of the Group',
  })
  @IsOptional()
  @IsString()
  lesson_day?: string;

  @ApiProperty({
    example: '10:00-12:00',
    description: 'The lesson time of the Group',
  })
  @IsOptional()
  @IsString()
  lesson_time?: string;

  @ApiProperty({
    example: 3,
    description: 'The duration in months of the Group',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration_months?: number;

  @ApiProperty({
    example: true,
    description: 'The status of the Group',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

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
  @IsOptional()
  @IsString()
  teacher_id?: string;
}
