import { IsString, Length, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

 @IsOptional()
@Type(() => Boolean)   // ← converts "true" / "false" to real boolean
@IsBoolean()
isActive?: boolean;

}
