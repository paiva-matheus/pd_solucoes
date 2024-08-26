import { Employee } from 'src/employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  spentHours: number;

  @Column()
  createdAt: Date;

  @Column({ nullable: false })
  employeeId: number;

  @ManyToOne(() => Employee, (employee) => employee.reports)
  employee: Employee;
}
