import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';
import { ListReportsDto } from './dto/list-reports.dto';

@Controller('/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/')
  async create(@Body() reportData: CreateReportDto): Promise<Report> {
    return this.reportService.create(reportData);
  }

  @Get('/')
  getSpentHours(@Query() query: ListReportsDto) {
    const { squadId, initialDate, endDate } = query;

    return this.reportService.getReports(
      squadId,
      new Date(initialDate),
      new Date(endDate),
    );
  }
}
