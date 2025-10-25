import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Match } from './src/entities/match.entity';
import { Player } from './src/entities/player.entity';
import { Game } from './src/entities/game.entity';
import { GameEvent } from './src/entities/game-event.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'pickle_score',
  entities: [Match, Player, Game, GameEvent],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, 'ap-southeast-1-bundle.pem')).toString(),
  },
});
