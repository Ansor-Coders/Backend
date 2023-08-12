import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Create a Course' })
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get all Course' })
  @Get()
  async findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Get Course' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Course' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete Course' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
