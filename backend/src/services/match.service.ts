import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { Player } from '../entities/player.entity';
import { CreateMatchDto } from '../dto/create-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const match = this.matchRepository.create({
      gameFormat: createMatchDto.config.gameFormat,
      scoringSystem: createMatchDto.config.scoringSystem,
      maxGames: createMatchDto.config.maxGames,
      winningScore: createMatchDto.config.winningScore,
      timeoutsPerGame: createMatchDto.config.timeoutsPerGame,
      venue: createMatchDto.config.venue,
      courtNumber: createMatchDto.config.courtNumber,
      status: 'pending',
    });

    const savedMatch = await this.matchRepository.save(match);

    const players = createMatchDto.players.map(playerDto =>
      this.playerRepository.create({
        ...playerDto,
        matchId: savedMatch.id,
      })
    );

    await this.playerRepository.save(players);

    return this.findOne(savedMatch.id);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ['players', 'games'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['players', 'games', 'games.events'],
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async update(id: string, updateData: Partial<Match>): Promise<Match> {
    const match = await this.findOne(id);
    Object.assign(match, updateData);
    await this.matchRepository.save(match);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const match = await this.findOne(id);
    await this.matchRepository.remove(match);
  }
}
