import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeveloperDto {
  @ApiProperty({
    example: 'john11',
    description: 'The username of the Developer',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'developer',
    description: 'The password of the Developer',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
