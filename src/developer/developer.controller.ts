import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDeveloperDto } from './dto/login-developer.dto';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @ApiOperation({ summary: 'Login Developer' })
  @Post('signin')
  async login(@Body() loginDeveloperDto: LoginDeveloperDto) {
    return this.developerService.login(loginDeveloperDto);
  }

  @ApiOperation({ summary: 'Create a Developer' })
  @Post()
  async create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developerService.create(createDeveloperDto);
  }

  @ApiOperation({ summary: 'Get all Developer' })
  @Get()
  async findAll() {
    return this.developerService.findAll();
  }

  @ApiOperation({ summary: 'Get Developer' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.developerService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Developer' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developerService.update(id, updateDeveloperDto);
  }

  @ApiOperation({ summary: 'Delete Developer' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.developerService.remove(id);
  }
}
