import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), EmployeeModule],
  exports: [TypeOrmModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
