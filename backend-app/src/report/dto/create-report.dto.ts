import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly spentHours: number;

  @IsNotEmpty()
  @IsInt()
  readonly employeeId: number;
}
