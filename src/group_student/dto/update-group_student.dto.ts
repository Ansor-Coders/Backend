import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateGroupStudentDto {
  @ApiProperty({
    example: true,
    description: 'The status of the Group',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
