import { Squad } from '../squad/squad.entity';
import { Report } from '../report/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  estimatedHours: number;

  @Column({ nullable: false })
  squadId: number;

  @ManyToOne(() => Squad, (squad) => squad.employees)
  squad: Squad;

  @OneToMany(() => Report, (report) => report.employee)
  reports: Report[];
}
