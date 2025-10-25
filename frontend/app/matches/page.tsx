"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { matchApi, type Match } from "@/lib/api";
import { ArrowLeft, Trophy, Calendar, MapPin } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await matchApi.getAll();
      setMatches(data);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMatchWinner = (match: Match): string | null => {
    if (!match.games || match.games.length === 0) return null;

    const completedGames = match.games.filter((g) => g.status === 'completed');
    if (completedGames.length === 0) return null;

    let team1Wins = 0;
    let team2Wins = 0;

    completedGames.forEach((game) => {
      if (game.team1Score > game.team2Score) team1Wins++;
      else if (game.team2Score > game.team1Score) team2Wins++;
    });

    const requiredWins = Math.ceil(match.maxGames / 2);

    if (team1Wins >= requiredWins) return 'Team 1';
    if (team2Wins >= requiredWins) return 'Team 2';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Match History</h1>
              <p className="text-muted-foreground">View all recorded matches</p>
            </div>
          </div>
          <Link href="/scorecard/new">
            <Button>New Scorecard</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading matches...</p>
          </div>
        ) : matches.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">No matches yet</p>
              <p className="text-muted-foreground mb-4">Create your first scorecard to get started</p>
              <Link href="/scorecard/new">
                <Button>Create Scorecard</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {matches.map((match) => {
              const team1Players = match.players.filter((p) => p.team === 1);
              const team2Players = match.players.filter((p) => p.team === 2);
              const winner = getMatchWinner(match);
              const completedGames = match.games?.filter((g) => g.status === 'completed') || [];

              return (
                <Link key={match.id} href={`/scorecard/${match.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={match.status === 'completed' ? 'secondary' : 'default'}>
                              {match.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {match.gameFormat.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {match.scoringSystem === 'rally' ? 'Rally Point' : 'Service Point'}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl mb-2">
                            {team1Players.map((p) => p.name).join(' & ')}
                            <span className="text-muted-foreground mx-3">vs</span>
                            {team2Players.map((p) => p.name).join(' & ')}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {formatDateTime(match.createdAt)}
                            </span>
                            {match.venue && (
                              <span className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {match.venue}
                                {match.courtNumber && ` - ${match.courtNumber}`}
                              </span>
                            )}
                          </CardDescription>
                        </div>
                        {winner && (
                          <div className="text-right">
                            <Trophy className="h-8 w-8 text-primary mb-1 ml-auto" />
                            <p className="text-sm font-medium text-primary">{winner} Wins</p>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Games: {completedGames.length} / {match.maxGames}
                        </span>
                        {completedGames.length > 0 && (
                          <div className="flex items-center space-x-2">
                            {completedGames.map((game, i) => (
                              <Badge key={i} variant="outline">
                                {game.team1Score}-{game.team2Score}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
