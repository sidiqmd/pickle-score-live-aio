"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreDisplay } from "@/components/scorecard/ScoreDisplay";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Info } from "lucide-react";

export default function SampleScorecardPage() {
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

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Sample Scorecard</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    This is a demonstration of what a live scorecard looks like during a match.
                    Ready to track your own game?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge>IN PROGRESS</Badge>
              <Badge variant="outline">DOUBLES</Badge>
              <Badge variant="outline">Rally Point</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Community Center - Court 1
            </div>
          </div>

          <ScoreDisplay
            team1Score={8}
            team2Score={6}
            team1Names={['Alice Johnson', 'Bob Smith']}
            team2Names={['Carol White', 'David Brown']}
            currentServer={1}
            serverNumber={2}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Game Format:</span>
                  <span className="font-medium">Doubles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scoring System:</span>
                  <span className="font-medium">Rally Point</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maximum Games:</span>
                  <span className="font-medium">Best of 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winning Score:</span>
                  <span className="font-medium">11 Points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timeouts Per Game:</span>
                  <span className="font-medium">2</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeouts Used</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Team 1 (Alice & Bob)</span>
                  <Badge variant="outline">1 / 2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Team 2 (Carol & David)</span>
                  <Badge variant="outline">0 / 2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Game History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">Game 1</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">11 - 9</span>
                    <Badge variant="secondary">completed</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border-2 border-primary">
                  <span className="font-medium">Game 2</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">8 - 6</span>
                    <Badge>in progress</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-200 dark:border-amber-800 text-center p-8">
            <CardTitle className="text-2xl mb-4">Ready to Create Your Own?</CardTitle>
            <p className="text-muted-foreground mb-6">
              Start tracking your pickleball matches with our modern, easy-to-use scorecard
            </p>
            <Link href="/scorecard/new">
              <Button size="lg">Create New Scorecard</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
