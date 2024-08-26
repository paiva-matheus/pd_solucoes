import { Squad } from '../squad/squad.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
}
