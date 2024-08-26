import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSquadDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
