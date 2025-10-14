/**
 * Space Maze - Home Component
 * Copyright (c) 2025 Ruel McNeil. All rights reserved.
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Trophy, Sparkles, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import StarField from "@/components/StarField";
import GameAnimation from "@/components/GameAnimation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  // Fetch top 3 scores
  const { data: topScores } = useQuery({
    queryKey: ["top-scores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("completion_time", { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5 relative overflow-hidden">
      <StarField />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(310_80%_55%/0.1),transparent_50%)]" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold animate-fade-in">
            Pure CSS • Zero JavaScript Game Logic
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight animate-fade-in">
            Navigate the<br />Cosmic Maze
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
            Experience a mind-bending puzzle adventure built entirely with HTML and CSS. 
            Test your skills through increasingly complex levels in the depths of space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-12">
            <Link to="/game">
              <Button size="lg" className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
            </Link>
          </div>

          {/* Top Scores Preview */}
          {topScores && topScores.length > 0 && (
            <Card className="w-full max-w-md mx-auto p-6 bg-card/50 backdrop-blur-sm border-primary/30 animate-fade-in hover:shadow-[0_0_50px_rgba(172,5,147,0.3)] transition-all">
              <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Top Pilots
              </h2>
              <div className="space-y-3">
                {topScores.map((score, index) => (
                  <div 
                    key={score.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                      <span className="text-lg">{score.player_name}</span>
                    </div>
                    <span className="text-lg font-mono text-secondary">{formatTime(score.completion_time)}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Game Demo Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hover your cursor over the glowing tiles to reveal the path. Reach the goal to advance!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-[0_0_50px_rgba(172,5,147,0.3)] animate-fade-in">
              <div className="aspect-square">
                <GameAnimation />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Live demo showing game mechanics
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Game Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-fade-in group hover:shadow-[0_0_30px_rgba(172,5,147,0.2)]">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Target className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Precision Control</h3>
              <p className="text-muted-foreground">
                Master the art of cursor navigation. One wrong move and you'll restart the level.
              </p>
            </Card>
            
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-fade-in [animation-delay:200ms] group hover:shadow-[0_0_30px_rgba(172,5,147,0.2)]">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Sparkles className="h-6 w-6 text-primary animate-pulse [animation-delay:100ms]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Progressive Challenge</h3>
              <p className="text-muted-foreground">
                Four unique levels that increase in complexity, testing your patience and skill.
              </p>
            </Card>
            
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-fade-in [animation-delay:400ms] group hover:shadow-[0_0_30px_rgba(172,5,147,0.2)]">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Trophy className="h-6 w-6 text-primary animate-pulse [animation-delay:200ms]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Pure CSS Magic</h3>
              <p className="text-muted-foreground">
                Built with only HTML & CSS - no JavaScript game logic required.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Test Your Skills?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of players navigating the cosmic challenge. Can you complete all four levels?
            </p>
            <Link to="/game">
              <Button size="lg" className="text-lg px-10 py-6 shadow-glow hover:scale-105 transition-transform">
                Begin Challenge
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Ruel McNeil. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            A Pure CSS Gaming Experience
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
