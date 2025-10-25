import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Player } from './entities/player.entity';
import { Game } from './entities/game.entity';
import { GameEvent } from './entities/game-event.entity';
import { MatchService } from './services/match.service';
import { GameService } from './services/game.service';
import { MatchController } from './controllers/match.controller';
import { GameController, MatchGameController } from './controllers/game.controller';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'postgres'),
        password: configService.get('DATABASE_PASSWORD', 'postgres'),
        database: configService.get('DATABASE_NAME', 'pickle_score'),
        entities: [Match, Player, Game, GameEvent],
        synchronize: configService.get('NODE_ENV') === 'development',
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync(path.join(process.cwd(), 'ap-southeast-1-bundle.pem')).toString(),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Match, Player, Game, GameEvent]),
  ],
  controllers: [MatchController, GameController, MatchGameController],
  providers: [MatchService, GameService],
})
export class AppModule {}
