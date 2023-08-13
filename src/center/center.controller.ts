import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Center')
@Controller('center')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @ApiOperation({ summary: 'Create a Center' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
        name: {
          type: 'string',
          example: 'Cambridge',
          description: 'The name of the Center',
        },
        address: {
          type: 'string',
          example: 'Yunusobod, Toshkent',
          description: 'The address of the Center',
        },
        admin_id: {
          type: 'string',
          example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
          description: 'The admin ID of the Center',
        },
        plan_id: {
          type: 'string',
          example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
          description: 'The plan ID of the Center',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCenterDto: CreateCenterDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.centerService.create(createCenterDto, image);
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

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
        name: {
          type: 'string',
          example: 'Cambridge',
          description: 'The name of the Center',
        },
        address: {
          type: 'string',
          example: 'Yunusobod, Toshkent',
          description: 'The address of the Center',
        },
        is_active: {
          type: 'boolean',
          example: true,
          description: 'The status of the Center',
        },
        plan_id: {
          type: 'string',
          example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
          description: 'The plan ID of the Center',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Update Center' })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateCenterDto: UpdateCenterDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.centerService.update(id, updateCenterDto, image);
  }

  @ApiOperation({ summary: 'Delete Center' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.centerService.remove(id);
  }

  // @ApiOperation({ summary: 'Delete Center' })
  // @Delete(':id/remove')
  // async removeCenter(@Param('id') id: string) {
  //   return this.centerService.removeCenter(id);
  // }

  @ApiOperation({ summary: 'Delete image of Center' })
  @Delete(':id/image')
  async removeImage(@Param('id') id: string) {
    return this.centerService.removeImage(id);
  }
}
