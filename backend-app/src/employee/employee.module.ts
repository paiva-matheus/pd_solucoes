import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SquadModule } from 'src/squad/squad.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), SquadModule],
  exports: [TypeOrmModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
