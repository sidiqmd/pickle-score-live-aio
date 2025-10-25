import { IsEnum, IsNumber, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class PlayerDto {
  @IsString()
  name: string;

  @IsEnum(['M', 'F', 'X'])
  gender: 'M' | 'F' | 'X';

  @IsNumber()
  team: number;
}

class GameConfigDto {
  @IsEnum(['singles', 'doubles'])
  gameFormat: 'singles' | 'doubles';

  @IsEnum(['rally', 'service'])
  scoringSystem: 'rally' | 'service';

  @IsNumber()
  @Min(1)
  maxGames: number;

  @IsNumber()
  @Min(1)
  winningScore: number;

  @IsNumber()
  @Min(0)
  timeoutsPerGame: number;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsString()
  courtNumber?: string;
}

export class CreateMatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  players: PlayerDto[];

  @ValidateNested()
  @Type(() => GameConfigDto)
  config: GameConfigDto;
}
