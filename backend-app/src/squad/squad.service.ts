import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    const squad = await this.squadsRepository.findOne({
      where: {
        name: squadData.name,
      },
    });

    if (squad) {
      throw new UnprocessableEntityException(
        'There is already a squad with this name',
      );
    }

    const data = this.squadsRepository.create({
      name: squadData.name,
    });
    return await this.squadsRepository.save(data);
  }

  async findById(squadId: number): Promise<Squad> {
    const squad = await this.squadsRepository.findOne({
      where: {
        id: squadId,
      },
    });

    if (!squad) {
      throw new NotFoundException('SquadId Not Found');
    }

    return squad;
  }
}
