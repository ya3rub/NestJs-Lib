import { IsNotEmpty, IsString } from 'class-validator';

export class TwoFACodeDto {
  @IsString()
  @IsNotEmpty()
  twoFACode: string;
}