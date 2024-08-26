import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateQueryDto {
  @IsNotEmpty()
  @IsDateString()
  readonly initialDate: string;

  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;
}
