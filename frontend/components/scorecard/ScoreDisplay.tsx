"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScoreDisplayProps {
  team1Score: number;
  team2Score: number;
  team1Names: string[];
  team2Names: string[];
  currentServer: number;
  serverNumber: 1 | 2;
}

export function ScoreDisplay({
  team1Score,
  team2Score,
  team1Names,
  team2Names,
  currentServer,
  serverNumber,
}: ScoreDisplayProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-card">
      <div className="grid grid-cols-3 gap-8 items-center">
        {/* Team 1 */}
        <div className="text-center space-y-2">
          <div className="space-y-1">
            {team1Names.map((name, i) => (
              <div
                key={i}
                className={`text-lg font-medium ${
                  currentServer === 1 && serverNumber === i + 1
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground'
                }`}
              >
                {name}
                {currentServer === 1 && serverNumber === i + 1 && (
                  <Badge className="ml-2" variant="default">Server</Badge>
                )}
              </div>
            ))}
          </div>
          <div className="text-6xl font-bold text-primary">{team1Score}</div>
          <div className="text-sm text-muted-foreground">Team 1</div>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center">
          <div className="text-4xl font-light text-muted-foreground">-</div>
        </div>

        {/* Team 2 */}
        <div className="text-center space-y-2">
          <div className="space-y-1">
            {team2Names.map((name, i) => (
              <div
                key={i}
                className={`text-lg font-medium ${
                  currentServer === 2 && serverNumber === i + 1
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground'
                }`}
              >
                {name}
                {currentServer === 2 && serverNumber === i + 1 && (
                  <Badge className="ml-2" variant="default">Server</Badge>
                )}
              </div>
            ))}
          </div>
          <div className="text-6xl font-bold text-primary">{team2Score}</div>
          <div className="text-sm text-muted-foreground">Team 2</div>
        </div>
      </div>
    </Card>
  );
}
