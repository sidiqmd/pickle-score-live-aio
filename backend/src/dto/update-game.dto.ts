import { IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  team1Score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  team2Score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  team1Timeouts?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  team2Timeouts?: number;

  @IsOptional()
  @IsNumber()
  currentServer?: number;

  @IsOptional()
  @IsEnum([1, 2])
  serverNumber?: 1 | 2;

  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed'])
  status?: 'pending' | 'in_progress' | 'completed';
}
