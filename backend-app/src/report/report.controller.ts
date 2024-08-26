import { Controller, Post, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';

@Controller('/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/')
  async create(@Body() reportData: CreateReportDto): Promise<Report> {
    return this.reportService.create(reportData);
  }
}
