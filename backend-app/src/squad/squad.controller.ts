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
    @Query('initialDate') initialDate: Date,
    @Query('endDate') endDate: Date,
  ) {
    if (!squadId || !initialDate || !endDate) {
      throw new BadRequestException(
        'The "squadId", "initialDate" and "endDate" parameters are required.',
      );
    }

    return this.squadService.getSquadWithEmployeesSpentHours(
      squadId,
      initialDate,
      endDate,
    );
  }
}
