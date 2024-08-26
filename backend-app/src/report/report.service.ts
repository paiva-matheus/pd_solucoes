import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createReportData: CreateReportDto) {
    await this.employeeService.findById(createReportData.employeeId);
    const data = this.reportRepository.create({
      description: createReportData.description,
      spentHours: createReportData.spentHours,
      employeeId: createReportData.employeeId,
    });

    return await this.reportRepository.save(data);
  }
}
