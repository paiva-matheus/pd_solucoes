import { IsDateString, IsNotEmpty } from 'class-validator';

export class ListReportsDto {
  @IsNotEmpty()
  readonly squadId: number;

  @IsNotEmpty()
  @IsDateString()
  readonly initialDate: string;

  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;
}
