import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Player } from './player.entity';
import { Game } from './game.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['singles', 'doubles'], default: 'doubles' })
  gameFormat: 'singles' | 'doubles';

  @Column({ type: 'enum', enum: ['rally', 'service'], default: 'rally' })
  scoringSystem: 'rally' | 'service';

  @Column({ default: 3 })
  maxGames: number;

  @Column({ default: 11 })
  winningScore: number;

  @Column({ default: 2 })
  timeoutsPerGame: number;

  @Column({ nullable: true })
  venue: string;

  @Column({ nullable: true })
  courtNumber: string;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'forfeited'], default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed' | 'forfeited';

  @OneToMany(() => Player, (player) => player.match, { cascade: true, eager: true })
  players: Player[];

  @OneToMany(() => Game, (game) => game.match, { cascade: true })
  games: Game[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
