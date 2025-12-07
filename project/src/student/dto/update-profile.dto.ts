import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
