"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus, Minus, Clock, AlertTriangle, Flag } from "lucide-react";

interface ControlPanelProps {
  gameStatus: 'pending' | 'in_progress' | 'completed';
  team1Timeouts: number;
  team2Timeouts: number;
  maxTimeouts: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onTimeout: (team: number) => void;
  onWarning: (team: number, player: string, type: 'verbal' | 'technical_warning' | 'technical_foul') => void;
  onMedicalTimeout: (team: number, player: string) => void;
  onSwitchSides: () => void;
  onForfeit: (type: 'game' | 'match', team: number) => void;
  players: { team: number; name: string }[];
}

export function ControlPanel({
  gameStatus,
  team1Timeouts,
  team2Timeouts,
  maxTimeouts,
  onStart,
  onStop,
  onReset,
  onTimeout,
  onWarning,
  onMedicalTimeout,
  onSwitchSides,
  onForfeit,
  players,
}: ControlPanelProps) {
  const [timeoutDialogOpen, setTimeoutDialogOpen] = useState(false);
  const [timeoutTeam, setTimeoutTeam] = useState<number>(1);

  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [warningTeam, setWarningTeam] = useState<number>(1);
  const [warningPlayer, setWarningPlayer] = useState<string>('');
  const [warningType, setWarningType] = useState<'verbal' | 'technical_warning' | 'technical_foul'>('verbal');

  const [medicalDialogOpen, setMedicalDialogOpen] = useState(false);
  const [medicalTeam, setMedicalTeam] = useState<number>(1);
  const [medicalPlayer, setMedicalPlayer] = useState<string>('');

  const [forfeitDialogOpen, setForfeitDialogOpen] = useState(false);
  const [forfeitType, setForfeitType] = useState<'game' | 'match'>('game');
  const [forfeitTeam, setForfeitTeam] = useState<number>(1);

  const handleTimeout = () => {
    onTimeout(timeoutTeam);
    setTimeoutDialogOpen(false);
  };

  const handleWarning = () => {
    onWarning(warningTeam, warningPlayer, warningType);
    setWarningDialogOpen(false);
    setWarningPlayer('');
  };

  const handleMedicalTimeout = () => {
    onMedicalTimeout(medicalTeam, medicalPlayer);
    setMedicalDialogOpen(false);
    setMedicalPlayer('');
  };

  const handleForfeit = () => {
    onForfeit(forfeitType, forfeitTeam);
    setForfeitDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Game Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {gameStatus === 'pending' && (
                <Button onClick={onStart} className="flex-1">Start Game</Button>
              )}
              {gameStatus === 'in_progress' && (
                <>
                  <Button onClick={onStop} variant="destructive" className="flex-1">Stop Game</Button>
                  <Button onClick={onReset} variant="outline" className="flex-1">Reset</Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeout Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Team 1: {team1Timeouts} / {maxTimeouts}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTimeoutTeam(1);
                  setTimeoutDialogOpen(true);
                }}
                disabled={team1Timeouts >= maxTimeouts || gameStatus !== 'in_progress'}
              >
                <Clock className="mr-2 h-4 w-4" />
                Timeout
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Team 2: {team2Timeouts} / {maxTimeouts}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTimeoutTeam(2);
                  setTimeoutDialogOpen(true);
                }}
                disabled={team2Timeouts >= maxTimeouts || gameStatus !== 'in_progress'}
              >
                <Clock className="mr-2 h-4 w-4" />
                Timeout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Penalties & Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Penalties & Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setWarningDialogOpen(true)}
              disabled={gameStatus !== 'in_progress'}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning / Foul
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setMedicalDialogOpen(true)}
              disabled={gameStatus !== 'in_progress'}
            >
              <Plus className="mr-2 h-4 w-4" />
              Medical Timeout
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onSwitchSides}
              disabled={gameStatus !== 'in_progress'}
            >
              Switch Sides
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => setForfeitDialogOpen(true)}
              disabled={gameStatus !== 'in_progress'}
            >
              <Flag className="mr-2 h-4 w-4" />
              Forfeit
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Timeout Dialog */}
      <Dialog open={timeoutDialogOpen} onOpenChange={setTimeoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Timeout</DialogTitle>
            <DialogDescription>Record a timeout for Team {timeoutTeam}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimeoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTimeout}>Confirm Timeout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <Dialog open={warningDialogOpen} onOpenChange={setWarningDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Warning / Foul</DialogTitle>
            <DialogDescription>Select the team, player, and type of penalty</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Team</Label>
              <Select value={String(warningTeam)} onValueChange={(v) => setWarningTeam(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Team 1</SelectItem>
                  <SelectItem value="2">Team 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Player</Label>
              <Select value={warningPlayer} onValueChange={setWarningPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter((p) => p.team === warningTeam)
                    .map((p, i) => (
                      <SelectItem key={i} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={warningType} onValueChange={(v: any) => setWarningType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verbal">Verbal Warning</SelectItem>
                  <SelectItem value="technical_warning">Technical Warning</SelectItem>
                  <SelectItem value="technical_foul">Technical Foul</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWarningDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWarning} disabled={!warningPlayer}>
              Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Medical Timeout Dialog */}
      <Dialog open={medicalDialogOpen} onOpenChange={setMedicalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Medical Timeout</DialogTitle>
            <DialogDescription>Record a medical timeout for a player</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Team</Label>
              <Select value={String(medicalTeam)} onValueChange={(v) => setMedicalTeam(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Team 1</SelectItem>
                  <SelectItem value="2">Team 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Player</Label>
              <Select value={medicalPlayer} onValueChange={setMedicalPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select player" />
                </SelectTrigger>
                <SelectContent>
                  {players
                    .filter((p) => p.team === medicalTeam)
                    .map((p, i) => (
                      <SelectItem key={i} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMedicalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMedicalTimeout} disabled={!medicalPlayer}>
              Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forfeit Dialog */}
      <Dialog open={forfeitDialogOpen} onOpenChange={setForfeitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Forfeit</DialogTitle>
            <DialogDescription>This action cannot be undone</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Forfeit Type</Label>
              <Select value={forfeitType} onValueChange={(v: any) => setForfeitType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="game">Game Forfeit</SelectItem>
                  <SelectItem value="match">Match Forfeit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Forfeiting Team</Label>
              <Select value={String(forfeitTeam)} onValueChange={(v) => setForfeitTeam(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Team 1</SelectItem>
                  <SelectItem value="2">Team 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setForfeitDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleForfeit}>
              Confirm Forfeit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
