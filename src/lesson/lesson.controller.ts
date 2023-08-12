import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiOperation({ summary: 'Create a Lesson' })
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @ApiOperation({ summary: 'Get all Lesson' })
  @Get()
  async findAll() {
    return this.lessonService.findAll();
  }

  @ApiOperation({ summary: 'Get Lesson' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Lesson' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @ApiOperation({ summary: 'Delete Lesson' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
