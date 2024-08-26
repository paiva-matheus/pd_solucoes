import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { Squad } from './squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';
import { ReturnAverageHoursSpentPerDayDto } from './dto/return-average-hours-spent-per-day';
import { DateQueryDto } from './dto/date-query.dto';

@Controller('squads')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get('/')
  findAll(): Promise<Squad[]> {
    return this.squadService.findAll();
  }

  @Post('/')
  async create(@Body() squadData: CreateSquadDto) {
    return this.squadService.create(squadData);
  }

  @Get('/:squadId/employees-spent-hours')
  getSpentHours(
    @Param('squadId') squadId: number,
    @Query() query: DateQueryDto,
  ) {
    const { initialDate, endDate } = query;

    return this.squadService.getSquadWithEmployeesSpentHours(
      squadId,
      new Date(initialDate),
      new Date(endDate),
    );
  }

  @Get('/:squadId/total-hours-performed')
  getTotalHoursPerformed(
    @Param('squadId') squadId: number,
    @Query() query: DateQueryDto,
  ) {
    const { initialDate, endDate } = query;

    return this.squadService.getSquadTotalHoursPerformed(
      squadId,
      new Date(initialDate),
      new Date(endDate),
    );
  }

  @Get('/:squadId/average-hours-spent-per-day')
  getAverageHoursSpentPerDay(
    @Param('squadId') squadId: number,
    @Query() query: DateQueryDto,
  ): Promise<ReturnAverageHoursSpentPerDayDto> {
    const { initialDate, endDate } = query;

    if (initialDate === endDate) {
      throw new BadRequestException(
        'The initialDate and endDate fields must be different.',
      );
    }

    return this.squadService.getSquadAverageHoursSpentPerDay(
      squadId,
      new Date(initialDate),
      new Date(endDate),
    );
  }
}
