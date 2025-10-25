import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Trophy, Users, Zap, CheckCircle, Timer } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Pickle Score Live</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/matches" className="text-sm hover:text-primary transition-colors">
              Recent Matches
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Link href="/scorecard/new">
              <Button>
                New Scorecard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6">
              The Modern Way to Track
              <span className="text-primary"> Pickleball Scores</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              A free, beautifully designed online scorecard for tracking pickleball games and matches.
              Perfect for referees, tournament organizers, and casual players.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scorecard/new">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Scoring Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/scorecard/sample">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Sample Scorecard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Everything You Need to Score</h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive features designed for serious pickleball scoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Real-Time Scoring</CardTitle>
                <CardDescription>
                  Track scores instantly with an intuitive interface designed for speed and accuracy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Singles & Doubles</CardTitle>
                <CardDescription>
                  Support for both singles and doubles matches with customizable team configurations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Timer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Timeout Management</CardTitle>
                <CardDescription>
                  Track timeouts, medical breaks, and game delays with precision timing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Rally & Service Point</CardTitle>
                <CardDescription>
                  Choose between rally point or traditional service point scoring systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Match History</CardTitle>
                <CardDescription>
                  Access complete match history with detailed statistics and results
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Penalty Tracking</CardTitle>
                <CardDescription>
                  Record warnings, technical fouls, and game/match forfeitures
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Simple to Use</h3>
            <p className="text-muted-foreground text-lg">
              Get started in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Configure Match</h4>
              <p className="text-sm text-muted-foreground">
                Enter player names, select game format, and choose scoring system
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">Track the Game</h4>
              <p className="text-sm text-muted-foreground">
                Use intuitive controls to update scores, manage timeouts, and record events
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Save & Share</h4>
              <p className="text-sm text-muted-foreground">
                Save match results and share them with players and organizers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center p-8 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/40 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Start Scoring?</CardTitle>
              <CardDescription className="text-base">
                Create your first scorecard now and experience the modern way to track pickleball matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/scorecard/new">
                <Button size="lg" className="mt-4">
                  Create New Scorecard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-semibold">Pickle Score Live</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Free online pickleball scorecard for everyone
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
