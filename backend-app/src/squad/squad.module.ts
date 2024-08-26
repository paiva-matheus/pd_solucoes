import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Squad } from './squad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Squad])],
  exports: [TypeOrmModule],
})
export class SquadModule {}
