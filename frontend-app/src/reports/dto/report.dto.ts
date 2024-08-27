import { dateFormatter } from '@/utils/formatter';

export type RemoteReport = {
  description: string;
  spentHours: number;
  createdAt: Date;
  employee: {
    name: string;
  };
};

export class ReportDto {
  constructor(private remoteReport: RemoteReport) {}

  get description() {
    return this.remoteReport.description;
  }

  get spentHours() {
    return this.remoteReport.spentHours;
  }

  get createdAt() {
    const date = new Date(this.remoteReport.createdAt)
    const createdAtFormatted = dateFormatter(date);
    return createdAtFormatted;
  }

  get name() {
    return this.remoteReport.employee.name;
  }

  toJSON() {
    return {
      description: this.description,
      spentHours: this.spentHours,
      createdAt: this.createdAt,
      name: this.name,
    };
  }
}
