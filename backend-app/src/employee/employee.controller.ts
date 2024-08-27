import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';

@Controller('/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/')
  async create(@Body() employeeData: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(employeeData);
  }

  @Get('/')
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }
}
