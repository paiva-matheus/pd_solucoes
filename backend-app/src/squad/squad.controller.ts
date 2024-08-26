import { Body, Controller, Get, Post } from '@nestjs/common';
import { SquadService } from './squad.service';
import { Squad } from './squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';

@Controller()
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get('/squads')
  findAll(): Promise<Squad[]> {
    return this.squadService.findAll();
  }

  @Post('/squads')
  async create(@Body() squadData: CreateSquadDto) {
    return this.squadService.create(squadData);
  }
}
