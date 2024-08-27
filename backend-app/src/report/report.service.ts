import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { InjectRepository } from '@nestjs/typeorm';

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

  async getReports(squadId: number, initialDate: Date, endDate: Date) {
    return await this.reportRepository
      .createQueryBuilder('report')
      .innerJoinAndSelect('report.employee', 'employee')
      .where('employee.squadId = :squadId', { squadId })
      .andWhere('report.createdAt BETWEEN :initialDate AND :endDate', {
        initialDate,
        endDate,
      })
      .select([
        'employee.name',
        'report.description',
        'report.spentHours',
        'report.createdAt',
      ])
      .getMany();
  }
}
