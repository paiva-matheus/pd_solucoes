import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { SquadService } from 'src/squad/squad.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly squadService: SquadService,
  ) {}

  async create(employeeData: CreateEmployeeDto): Promise<Employee> {
    await this.squadService.findById(employeeData.squadId);
    const data = this.employeeRepository.create({
      name: employeeData.name,
      estimatedHours: employeeData.estimatedHours,
      squadId: employeeData.squadId,
    });
    return await this.employeeRepository.save(data);
  }
}
