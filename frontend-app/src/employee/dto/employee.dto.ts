export type Employee = {
  id: number;
  name: string;
  estimatedHours: number;
  squadId: number;
};

export class EmployeeDto {
  constructor(private employee: Employee) {}

  get id() {
    return this.employee.id;
  }

  get name() {
    return this.employee.name;
  }

  get estimatedHours() {
    return this.employee.estimatedHours;
  }

  get squadId() {
    return this.employee.squadId;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      estimatedHours: this.estimatedHours,
      squadId: this.squadId,
    };
  }
}
