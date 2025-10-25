import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Match } from './match.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['M', 'F', 'X'] })
  gender: 'M' | 'F' | 'X';

  @Column()
  team: number;

  @ManyToOne(() => Match, (match) => match.players)
  match: Match;

  @Column()
  matchId: string;
}
