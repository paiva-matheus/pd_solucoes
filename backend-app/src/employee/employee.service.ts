import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(employeeId: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException('EmployeeId Not Found');
    }

    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
}
