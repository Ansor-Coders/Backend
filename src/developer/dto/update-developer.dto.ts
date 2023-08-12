import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeveloperDto {
  @ApiProperty({
    example: 'john77',
    description: 'The username of the Developer',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the Developer',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
