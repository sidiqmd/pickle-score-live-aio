import { IsEnum, IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateEventDto {
  @IsEnum(['score', 'timeout', 'warning', 'technical_warning', 'technical_foul', 'medical_timeout', 'switch_sides', 'delay', 'forfeit'])
  type: 'score' | 'timeout' | 'warning' | 'technical_warning' | 'technical_foul' | 'medical_timeout' | 'switch_sides' | 'delay' | 'forfeit';

  @IsOptional()
  @IsNumber()
  team?: number;

  @IsOptional()
  @IsString()
  player?: string;

  @IsOptional()
  @IsObject()
  data?: any;
}
