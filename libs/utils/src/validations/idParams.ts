import { IsNumberString } from 'class-validator';
 
export class IdParams {
  @IsNumberString()
  id: string;
}