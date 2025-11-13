import { IsNotEmpty, Matches, IsOptional, IsDateString, IsUrl } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name should not contain numbers' })
  name: string;

  @IsNotEmpty({ message: 'invalid Passwoord' })
  @Matches(/^(?=.*[@#$&]).*$/, { message: 'Password must cont ain at least one special character (@, #, $, &)'})
  password: string;


  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  dob?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid social media URL' })
  facebook?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid social media URL' })
  linkedin?: string;




  // @IsOptional()
  //@IsEmail({}, { message: 'Invalid email address' })
  //email?: string; 

 // @IsNotEmpty({ message: 'Phone number is required' })
  //@Matches(/^01\d{8,9}$/, { 'm' })
  //phone: string;
}
