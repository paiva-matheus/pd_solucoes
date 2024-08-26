import { Module } from '@nestjs/common';
import { SquadModule } from './squad.module';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';

@Module({
  imports: [SquadModule],
  providers: [SquadService],
  controllers: [SquadController],
  exports: [SquadService],
})
export class SquadHttpModule {}
