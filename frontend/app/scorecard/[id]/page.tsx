"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreDisplay } from "@/components/scorecard/ScoreDisplay";
import { ControlPanel } from "@/components/scorecard/ControlPanel";
import { matchApi, gameApi, type Match, type Game } from "@/lib/api";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ScorecardPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatch();
  }, [matchId]);

  const loadMatch = async () => {
    try {
      const data = await matchApi.getById(matchId);
      setMatch(data);

      if (data.games && data.games.length > 0) {
        const activeGame = data.games.find((g) => g.status !== 'completed') || data.games[data.games.length - 1];
        setCurrentGame(activeGame);
      }
    } catch (error) {
      console.error('Error loading match:', error);
      alert('Failed to load match');
    } finally {
      setLoading(false);
    }
  };

  const createNewGame = async () => {
    if (!match) return;

    try {
      const newGame = await gameApi.create(match.id);
      setCurrentGame(newGame);
      await loadMatch();
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Failed to create new game');
    }
  };

  const handleStartGame = async () => {
    if (!currentGame) {
      await createNewGame();
      return;
    }

    try {
      const updated = await gameApi.start(currentGame.id);
      setCurrentGame(updated);
      await loadMatch();
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Failed to start game');
    }
  };

  const handleStopGame = async () => {
    if (!currentGame) return;

    try {
      const updated = await gameApi.complete(currentGame.id);
      setCurrentGame(updated);
      await loadMatch();
    } catch (error) {
      console.error('Error stopping game:', error);
      alert('Failed to stop game');
    }
  };

  const handleResetGame = async () => {
    if (!currentGame || !confirm('Are you sure you want to reset this game?')) return;

    try {
      await gameApi.update(currentGame.id, {
        team1Score: 0,
        team2Score: 0,
        team1Timeouts: 0,
        team2Timeouts: 0,
        currentServer: 1,
        serverNumber: 1,
      });
      await loadMatch();
      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error resetting game:', error);
      alert('Failed to reset game');
    }
  };

  const updateScore = async (team: number, increment: number) => {
    if (!currentGame || currentGame.status !== 'in_progress') return;

    try {
      const newScore = team === 1
        ? Math.max(0, currentGame.team1Score + increment)
        : Math.max(0, currentGame.team2Score + increment);

      const updateData = team === 1
        ? { team1Score: newScore }
        : { team2Score: newScore };

      await gameApi.update(currentGame.id, updateData);
      await gameApi.addEvent(currentGame.id, {
        type: 'score',
        team,
        data: { increment, newScore },
      });

      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error updating score:', error);
      alert('Failed to update score');
    }
  };

  const handleTimeout = async (team: number) => {
    if (!currentGame) return;

    try {
      const currentTimeouts = team === 1 ? currentGame.team1Timeouts : currentGame.team2Timeouts;
      const updateData = team === 1
        ? { team1Timeouts: currentTimeouts + 1 }
        : { team2Timeouts: currentTimeouts + 1 };

      await gameApi.update(currentGame.id, updateData);
      await gameApi.addEvent(currentGame.id, {
        type: 'timeout',
        team,
      });

      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error recording timeout:', error);
      alert('Failed to record timeout');
    }
  };

  const handleWarning = async (team: number, player: string, type: 'verbal' | 'technical_warning' | 'technical_foul') => {
    if (!currentGame) return;

    try {
      await gameApi.addEvent(currentGame.id, {
        type: type === 'verbal' ? 'warning' : type,
        team,
        player,
      });

      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error recording warning:', error);
      alert('Failed to record warning');
    }
  };

  const handleMedicalTimeout = async (team: number, player: string) => {
    if (!currentGame) return;

    try {
      await gameApi.addEvent(currentGame.id, {
        type: 'medical_timeout',
        team,
        player,
      });

      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error recording medical timeout:', error);
      alert('Failed to record medical timeout');
    }
  };

  const handleSwitchSides = async () => {
    if (!currentGame) return;

    try {
      await gameApi.addEvent(currentGame.id, {
        type: 'switch_sides',
      });

      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error recording side switch:', error);
      alert('Failed to record side switch');
    }
  };

  const handleForfeit = async (type: 'game' | 'match', team: number) => {
    if (!currentGame) return;

    try {
      await gameApi.addEvent(currentGame.id, {
        type: 'forfeit',
        team,
        data: { forfeitType: type },
      });

      if (type === 'match') {
        await matchApi.update(match!.id, { status: 'forfeited' });
      }

      await gameApi.complete(currentGame.id);
      await loadMatch();
      const updated = await gameApi.getById(currentGame.id);
      setCurrentGame(updated);
    } catch (error) {
      console.error('Error recording forfeit:', error);
      alert('Failed to record forfeit');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading scorecard...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Match not found</p>
      </div>
    );
  }

  const team1Players = match.players.filter((p) => p.team === 1);
  const team2Players = match.players.filter((p) => p.team === 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Badge variant={match.status === 'in_progress' ? 'default' : 'secondary'}>
              {match.status.replace('_', ' ').toUpperCase()}
            </Badge>
            {match.venue && <span className="text-sm text-muted-foreground">{match.venue}</span>}
            {match.courtNumber && <span className="text-sm text-muted-foreground">Court: {match.courtNumber}</span>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Score Display */}
            {currentGame ? (
              <ScoreDisplay
                team1Score={currentGame.team1Score}
                team2Score={currentGame.team2Score}
                team1Names={team1Players.map((p) => p.name)}
                team2Names={team2Players.map((p) => p.name)}
                currentServer={currentGame.currentServer}
                serverNumber={currentGame.serverNumber}
              />
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No active game</p>
                <Button onClick={createNewGame}>Start First Game</Button>
              </Card>
            )}

            {/* Score Controls */}
            {currentGame && currentGame.status === 'in_progress' && (
              <Card>
                <CardHeader>
                  <CardTitle>Score Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-center">Team 1</p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => updateScore(1, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => updateScore(1, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-center">Team 2</p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => updateScore(2, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => updateScore(2, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Game History */}
            {match.games && match.games.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Game History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {match.games.map((game) => (
                      <div
                        key={game.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          game.id === currentGame?.id
                            ? 'bg-primary/10 border-2 border-primary'
                            : 'bg-muted/50'
                        }`}
                      >
                        <span className="font-medium">Game {game.gameNumber}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold">
                            {game.team1Score} - {game.team2Score}
                          </span>
                          <Badge variant={game.status === 'completed' ? 'secondary' : 'default'}>
                            {game.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  {match.games.every((g) => g.status === 'completed') &&
                    match.games.length < match.maxGames && (
                      <Button className="w-full mt-4" onClick={createNewGame}>
                        Start Next Game
                      </Button>
                    )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Control Panel */}
          <div>
            {currentGame && (
              <ControlPanel
                gameStatus={currentGame.status}
                team1Timeouts={currentGame.team1Timeouts}
                team2Timeouts={currentGame.team2Timeouts}
                maxTimeouts={match.timeoutsPerGame}
                onStart={handleStartGame}
                onStop={handleStopGame}
                onReset={handleResetGame}
                onTimeout={handleTimeout}
                onWarning={handleWarning}
                onMedicalTimeout={handleMedicalTimeout}
                onSwitchSides={handleSwitchSides}
                onForfeit={handleForfeit}
                players={match.players.map((p) => ({ team: p.team, name: p.name }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
