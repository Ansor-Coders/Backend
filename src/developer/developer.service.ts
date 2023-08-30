import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Developer } from './models/developer.model';
import { JwtService } from '@nestjs/jwt';
import { LoginDeveloperDto } from './dto/login-developer.dto';
import { compare, hash } from 'bcryptjs';
import { v4 } from 'uuid';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel(Developer) private developerRepository: typeof Developer,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDeveloperDto: LoginDeveloperDto) {
    const { username, password } = loginDeveloperDto;
    const developerByUsername = await this.getDeveloperByUsername(username);
    if (!developerByUsername) {
      throw new UnauthorizedException('Username or password is wrong');
    }
    const isMatchPass = await compare(
      password,
      developerByUsername.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('Username or password is wrong');
    }
    const token = await this.getToken(developerByUsername);
    const developer = await this.getOne(developerByUsername.id);
    const response = {
      token,
      role: 'DEVELOPER',
      developer,
    };
    return response;
  }

  async create(createDeveloperDto: CreateDeveloperDto) {
    const developerByUsername = await this.getDeveloperByUsername(
      createDeveloperDto.username,
    );
    if (developerByUsername) {
      throw new BadRequestException('Username already registered!');
    }
    const hashed_password = await hash(createDeveloperDto.password, 7);
    const developer = await this.developerRepository.create({
      id: v4(),
      ...createDeveloperDto,
      hashed_password,
    });
    return this.getOne(developer.id);
  }

  async findAll() {
    return this.developerRepository.findAll({
      attributes: ['id', 'username', 'is_active'],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateDeveloperDto: UpdateDeveloperDto) {
    await this.getOne(id);

    if (updateDeveloperDto.username) {
      const developerByUsername = await this.getDeveloperByUsername(
        updateDeveloperDto.username,
      );
      if (developerByUsername && developerByUsername.id != id) {
        throw new BadRequestException('Username already registered!');
      }
    }

    if (updateDeveloperDto.password) {
      const hashed_password = await hash(updateDeveloperDto.password, 7);
      await this.developerRepository.update(
        { hashed_password },
        { where: { id } },
      );
    }

    await this.developerRepository.update(updateDeveloperDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.developerRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const developer = await this.developerRepository.findOne({
      where: { id },
      attributes: ['id', 'username', 'is_active'],
    });
    if (!developer) {
      throw new HttpException('Developer not found', HttpStatus.NOT_FOUND);
    }
    return developer;
  }

  async getDeveloperByUsername(username: string) {
    const developer = await this.developerRepository.findOne({
      where: { username },
      attributes: ['id', 'username', 'hashed_password'],
    });
    return developer;
  }

  async getToken(developer: Developer) {
    try {
      const jwtPayload = {
        id: developer.id,
        username: developer.username,
        role: 'DEVELOPER',
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
