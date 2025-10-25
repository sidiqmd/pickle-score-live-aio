import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { Game } from '../entities/game.entity';
import { GameEvent } from '../entities/game-event.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USER', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'postgres'),
  database: configService.get('DATABASE_NAME', 'pickle_score'),
  entities: [Match, Player, Game, GameEvent],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
