import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'john77',
    description: 'The username of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the Admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
