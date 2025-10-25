import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Match } from './match.entity';
import { GameEvent } from './game-event.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Match, (match) => match.games)
  match: Match;

  @Column()
  matchId: string;

  @Column()
  gameNumber: number;

  @Column({ default: 0 })
  team1Score: number;

  @Column({ default: 0 })
  team2Score: number;

  @Column({ default: 0 })
  team1Timeouts: number;

  @Column({ default: 0 })
  team2Timeouts: number;

  @Column({ default: 1 })
  currentServer: number;

  @Column({ type: 'enum', enum: [1, 2], default: 1 })
  serverNumber: 1 | 2;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed'], default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed';

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @OneToMany(() => GameEvent, (event) => event.game, { cascade: true, eager: true })
  events: GameEvent[];

  @CreateDateColumn()
  createdAt: Date;
}
