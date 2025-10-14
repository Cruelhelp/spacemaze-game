/**
 * Space Maze - Home Component
 * Copyright (c) 2025 Ruel McNeil. All rights reserved.
 */

import { Link } from "react-router-dom";
import { StarField } from "@/components/StarField";
import { Logo3D } from "@/components/Logo3D";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and Title */}
        <div className="mb-8 animate-slide-in-up">
          <Logo3D size="lg" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gradient glow-text animate-slide-in-up text-center"
            style={{ animationDelay: "0.1s" }}>
          SPACE MAZE
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-slide-in-up text-center max-w-2xl"
           style={{ animationDelay: "0.2s" }}>
          Navigate the cosmic labyrinth. Hover to reveal your path through the stars.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-16 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/game">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 animate-pulse-glow"
            >
              Start Mission
            </Button>
          </Link>
          
          <Link to="/leaderboard">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Leaderboard
            </Button>
          </Link>
        </div>

        {/* Top Scores Preview */}
        {topScores && topScores.length > 0 && (
          <Card className="w-full max-w-md p-6 bg-card/50 backdrop-blur-sm border-primary/30 animate-slide-in-up"
                style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-bold mb-4 text-center text-gradient">Top Pilots</h2>
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

        {/* Instructions */}
        <div className="absolute bottom-8 text-center text-sm text-muted-foreground max-w-md px-4">
          <p>Hover over tiles to reveal your path. Stay on course to reach the goal.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
