import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Squad } from './squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';

@Injectable()
export class SquadService {
  constructor(
    @InjectRepository(Squad)
    private squadsRepository: Repository<Squad>,
  ) {}

  async findAll(): Promise<Squad[]> {
    return await this.squadsRepository.find();
  }

  async create(squadData: CreateSquadDto): Promise<Squad> {
    const data = this.squadsRepository.create({
      name: squadData.name,
    });
    return await this.squadsRepository.save(data);
  }
}
