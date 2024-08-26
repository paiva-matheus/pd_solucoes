import { Controller, Post, Body } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/reports')
  async create(@Body() reportData: CreateReportDto) {
    return this.reportService.create(reportData);
  }
}
