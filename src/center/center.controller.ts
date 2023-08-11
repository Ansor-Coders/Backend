import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Center')
@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @ApiOperation({ summary: 'Create a Center' })
  @Post()
  async create(@Body() createCenterDto: CreateCenterDto) {
    return this.centerService.create(createCenterDto);
  }

  @ApiOperation({ summary: 'Get all Center' })
  @Get()
  async findAll() {
    return this.centerService.findAll();
  }

  @ApiOperation({ summary: 'Get Center' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.centerService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Center' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCenterDto: UpdateCenterDto,
  ) {
    return this.centerService.update(id, updateCenterDto);
  }

  @ApiOperation({ summary: 'Delete Center' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.centerService.remove(id);
  }
}
