import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly estimatedHours: number;

  @IsNotEmpty()
  @IsInt()
  readonly squadId: number;
}
