import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginTeacherDto } from './dto/login-teacher.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Login Teacher' })
  @Post('signin')
  async login(@Body() loginTeacherDto: LoginTeacherDto) {
    return this.teacherService.login(loginTeacherDto);
  }

  @ApiOperation({ summary: 'Create a Teacher' })
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Get all Teacher' })
  @Get()
  async findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'Get Teacher' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Teacher' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Delete Teacher' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
