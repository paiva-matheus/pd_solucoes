import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Squad } from './squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';
import { getDaysBetweenDates } from 'src/utils/dates';

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

  async findById(id: number): Promise<Squad> {
    const squad = await this.squadsRepository.findOne({
      where: {
        id,
      },
    });

    if (!squad) {
      throw new NotFoundException('SquadId Not Found');
    }

    return squad;
  }

  async getSquadTotalHoursPerformed(
    squadId: number,
    initialDate: Date,
    endDate: Date,
  ) {
    const query = await this.squadsRepository
      .createQueryBuilder('squad')
      .innerJoinAndSelect('squad.employees', 'employee')
      .innerJoinAndSelect('employee.reports', 'report')
      .select('SUM(report.spentHours)', 'totalHoursPerformed')
      .where('squad.id = :squadId', { squadId })
      .andWhere('report.createdAt BETWEEN :initialDate AND :endDate', {
        initialDate,
        endDate,
      })
      .getRawOne();

    return query;
  }

  async getSquadAverageHoursSpentPerDay(
    squadId: number,
    initialDate: Date,
    endDate: Date,
  ) {
    const days = getDaysBetweenDates(initialDate, endDate);

    const query = await this.squadsRepository
      .createQueryBuilder('squad')
      .innerJoinAndSelect('squad.employees', 'employee')
      .innerJoinAndSelect('employee.reports', 'report')
      .select('SUM(report.spentHours)', 'totalHoursPerformed')
      .where('squad.id = :squadId', { squadId })
      .andWhere('report.createdAt BETWEEN :initialDate AND :endDate', {
        initialDate,
        endDate,
      })
      .getRawOne();

    return { averageHoursSpentPerDay: query.totalHoursPerformed / days };
  }
}
