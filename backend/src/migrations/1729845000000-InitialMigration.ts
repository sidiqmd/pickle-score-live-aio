import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1729845000000 implements MigrationInterface {
    name = 'InitialMigration1729845000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "matches" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "gameFormat" character varying NOT NULL DEFAULT 'doubles',
                "scoringSystem" character varying NOT NULL DEFAULT 'rally',
                "maxGames" integer NOT NULL DEFAULT '3',
                "winningScore" integer NOT NULL DEFAULT '11',
                "timeoutsPerGame" integer NOT NULL DEFAULT '2',
                "venue" character varying,
                "courtNumber" character varying,
                "status" character varying NOT NULL DEFAULT 'pending',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_matches" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "players" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "gender" character varying NOT NULL,
                "team" integer NOT NULL,
                "matchId" uuid NOT NULL,
                CONSTRAINT "PK_players" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "games" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "matchId" uuid NOT NULL,
                "gameNumber" integer NOT NULL,
                "team1Score" integer NOT NULL DEFAULT '0',
                "team2Score" integer NOT NULL DEFAULT '0',
                "team1Timeouts" integer NOT NULL DEFAULT '0',
                "team2Timeouts" integer NOT NULL DEFAULT '0',
                "currentServer" integer NOT NULL DEFAULT '1',
                "serverNumber" integer NOT NULL DEFAULT '1',
                "status" character varying NOT NULL DEFAULT 'pending',
                "startedAt" TIMESTAMP,
                "completedAt" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_games" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "game_events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "gameId" uuid NOT NULL,
                "type" character varying NOT NULL,
                "team" integer,
                "player" character varying,
                "data" jsonb,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_game_events" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "players"
            ADD CONSTRAINT "FK_players_matchId"
            FOREIGN KEY ("matchId")
            REFERENCES "matches"("id")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "games"
            ADD CONSTRAINT "FK_games_matchId"
            FOREIGN KEY ("matchId")
            REFERENCES "matches"("id")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "game_events"
            ADD CONSTRAINT "FK_game_events_gameId"
            FOREIGN KEY ("gameId")
            REFERENCES "games"("id")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_events" DROP CONSTRAINT "FK_game_events_gameId"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_games_matchId"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_players_matchId"`);
        await queryRunner.query(`DROP TABLE "game_events"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "matches"`);
    }
}
