import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { GameEvent } from '../entities/game-event.entity';
import { Match } from '../entities/match.entity';
import { UpdateGameDto } from '../dto/update-game.dto';
import { CreateEventDto } from '../dto/create-event.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(GameEvent)
    private eventRepository: Repository<GameEvent>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async create(matchId: string): Promise<Game> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ['games'],
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    const gameNumber = (match.games?.length || 0) + 1;

    const game = this.gameRepository.create({
      matchId,
      gameNumber,
      team1Score: 0,
      team2Score: 0,
      team1Timeouts: 0,
      team2Timeouts: 0,
      currentServer: 1,
      serverNumber: 1,
      status: 'pending',
    });

    return this.gameRepository.save(game);
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['events', 'match'],
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    Object.assign(game, updateGameDto);
    await this.gameRepository.save(game);
    return this.findOne(id);
  }

  async start(id: string): Promise<Game> {
    const game = await this.findOne(id);
    game.status = 'in_progress';
    game.startedAt = new Date();

    const match = await this.matchRepository.findOne({ where: { id: game.matchId } });
    if (match && match.status === 'pending') {
      match.status = 'in_progress';
      await this.matchRepository.save(match);
    }

    await this.gameRepository.save(game);
    return this.findOne(id);
  }

  async complete(id: string): Promise<Game> {
    const game = await this.findOne(id);
    game.status = 'completed';
    game.completedAt = new Date();
    await this.gameRepository.save(game);
    return this.findOne(id);
  }

  async addEvent(gameId: string, createEventDto: CreateEventDto): Promise<GameEvent> {
    const game = await this.findOne(gameId);

    const event = this.eventRepository.create({
      gameId,
      ...createEventDto,
    });

    return this.eventRepository.save(event);
  }
}
