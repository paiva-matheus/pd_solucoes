import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Squad } from './squad.entity';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Squad])],
  controllers: [SquadController],
  providers: [SquadService],
  exports: [TypeOrmModule, SquadService],
})
export class SquadModule {}
