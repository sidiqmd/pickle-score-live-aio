"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { matchApi, type Player, type GameConfig } from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewScorecardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [gameFormat, setGameFormat] = useState<'singles' | 'doubles'>('doubles');
  const [scoringSystem, setScoringSystem] = useState<'rally' | 'service'>('rally');
  const [maxGames, setMaxGames] = useState(3);
  const [winningScore, setWinningScore] = useState(11);
  const [timeoutsPerGame, setTimeoutsPerGame] = useState(2);
  const [venue, setVenue] = useState('');
  const [courtNumber, setCourtNumber] = useState('');

  const [players, setPlayers] = useState<Player[]>([
    { name: '', gender: 'M', team: 1 },
    { name: '', gender: 'M', team: 1 },
    { name: '', gender: 'M', team: 2 },
    { name: '', gender: 'M', team: 2 },
  ]);

  const updatePlayer = (index: number, field: keyof Player, value: any) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config: GameConfig = {
        gameFormat,
        scoringSystem,
        maxGames,
        winningScore,
        timeoutsPerGame,
        venue: venue || undefined,
        courtNumber: courtNumber || undefined,
      };

      const playersToSubmit = gameFormat === 'singles'
        ? [players[0], players[2]]
        : players;

      const match = await matchApi.create({
        players: playersToSubmit,
        config,
      });

      router.push(`/scorecard/${match.id}`);
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Failed to create match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const numPlayers = gameFormat === 'singles' ? 2 : 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">New Scorecard</CardTitle>
            <CardDescription>Configure your match settings and player information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Game Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Match Configuration</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gameFormat">Game Format</Label>
                    <Select value={gameFormat} onValueChange={(v) => setGameFormat(v as any)}>
                      <SelectTrigger id="gameFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doubles">Doubles</SelectItem>
                        <SelectItem value="singles">Singles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scoringSystem">Scoring System</Label>
                    <Select value={scoringSystem} onValueChange={(v) => setScoringSystem(v as any)}>
                      <SelectTrigger id="scoringSystem">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rally">Rally Point</SelectItem>
                        <SelectItem value="service">Service Point</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxGames">Maximum Games</Label>
                    <Input
                      id="maxGames"
                      type="number"
                      min="1"
                      max="5"
                      value={maxGames}
                      onChange={(e) => setMaxGames(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="winningScore">Winning Score</Label>
                    <Input
                      id="winningScore"
                      type="number"
                      min="1"
                      value={winningScore}
                      onChange={(e) => setWinningScore(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeoutsPerGame">Timeouts Per Game</Label>
                    <Input
                      id="timeoutsPerGame"
                      type="number"
                      min="0"
                      max="5"
                      value={timeoutsPerGame}
                      onChange={(e) => setTimeoutsPerGame(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Venue Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Venue Information (Optional)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue</Label>
                    <Input
                      id="venue"
                      placeholder="e.g., Community Center"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courtNumber">Court Number</Label>
                    <Input
                      id="courtNumber"
                      placeholder="e.g., Court 1"
                      value={courtNumber}
                      onChange={(e) => setCourtNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Player Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Player Information</h3>

                {/* Team 1 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">Team 1</h4>
                  {players.slice(0, gameFormat === 'singles' ? 1 : 2).map((player, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Player {index + 1} Name</Label>
                        <Input
                          placeholder="Enter player name"
                          value={player.name}
                          onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={player.gender} onValueChange={(v) => updatePlayer(index, 'gender', v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                            <SelectItem value="X">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team 2 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">Team 2</h4>
                  {players.slice(2, gameFormat === 'singles' ? 3 : 4).map((player, index) => {
                    const actualIndex = index + 2;
                    return (
                      <div key={actualIndex} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Player {actualIndex + 1} Name</Label>
                          <Input
                            placeholder="Enter player name"
                            value={player.name}
                            onChange={(e) => updatePlayer(actualIndex, 'name', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <Select value={player.gender} onValueChange={(v) => updatePlayer(actualIndex, 'gender', v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M">Male</SelectItem>
                              <SelectItem value="F">Female</SelectItem>
                              <SelectItem value="X">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Link href="/">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Scorecard'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
