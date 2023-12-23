import { IsNotEmpty } from 'class-validator';

export class UpdateStatus {
  @IsNotEmpty()
  isClosed: boolean;
}
