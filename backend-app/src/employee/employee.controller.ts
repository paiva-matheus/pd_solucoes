import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/employees')
  async create(@Body() employeeData: CreateEmployeeDto) {
    return this.employeeService.create(employeeData);
  }
}
