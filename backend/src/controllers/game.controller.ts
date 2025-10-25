import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { UpdateGameDto } from '../dto/update-game.dto';
import { CreateEventDto } from '../dto/create-event.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Post(':id/start')
  start(@Param('id') id: string) {
    return this.gameService.start(id);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.gameService.complete(id);
  }

  @Post(':id/events')
  addEvent(@Param('id') id: string, @Body() createEventDto: CreateEventDto) {
    return this.gameService.addEvent(id, createEventDto);
  }
}

@Controller('matches/:matchId/games')
export class MatchGameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Param('matchId') matchId: string) {
    return this.gameService.create(matchId);
  }
}
