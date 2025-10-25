import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity('game_events')
export class GameEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.events)
  game: Game;

  @Column()
  gameId: string;

  @Column({
    type: 'enum',
    enum: ['score', 'timeout', 'warning', 'technical_warning', 'technical_foul', 'medical_timeout', 'switch_sides', 'delay', 'forfeit']
  })
  type: 'score' | 'timeout' | 'warning' | 'technical_warning' | 'technical_foul' | 'medical_timeout' | 'switch_sides' | 'delay' | 'forfeit';

  @Column({ nullable: true })
  team: number;

  @Column({ nullable: true })
  player: string;

  @Column({ type: 'jsonb', nullable: true })
  data: any;

  @CreateDateColumn()
  timestamp: Date;
}
