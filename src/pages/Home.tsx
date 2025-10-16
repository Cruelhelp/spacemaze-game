import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Play } from "lucide-react";
import { Logo3D } from "@/components/Logo3D";
import { StarField } from "@/components/StarField";

const Home = () => {
  const navigate = useNavigate();
  const [topScores, setTopScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("completion_time", { ascending: true })
        .limit(3);
      
      if (!error && data) {
        setTopScores(data);
      }
    };

    fetchTopScores();
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = ms % 1000;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <StarField />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-slide-in-up">
          <div className="flex justify-center mb-6 animate-float">
            <Logo3D size="lg" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-gradient glow-text pixel-font tracking-wider drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              SPACE MAZE
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-bold pixel-font tracking-wide glow-text animate-pulse-glow">
              [ QUANTUM NAVIGATION SYSTEM ]
            </p>
          </div>
          
          <p className="text-base md:text-lg text-foreground/90 max-w-3xl mx-auto leading-relaxed pixel-font">
            Navigate the dimensional cube grid. Hover to materialize the quantum path. 
            One miscalculation resets the timeline. Four levels stand between you and glory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button 
              size="lg" 
              onClick={() => navigate("/game")}
              className="bg-primary hover:bg-primary/90 animate-pulse-glow text-lg md:text-xl px-10 py-7 pixel-font border-2 border-primary-foreground/20 hover:scale-105 transition-all shadow-[0_0_30px_rgba(168,85,247,0.5)]"
            >
              <Play className="mr-3 h-5 w-5" />
              START MISSION
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/leaderboard")}
              className="border-2 border-secondary hover:border-secondary hover:bg-secondary/20 text-lg md:text-xl px-10 py-7 pixel-font hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            >
              <Trophy className="mr-3 h-5 w-5" />
              LEADERBOARD
            </Button>
          </div>

          {/* Top Scores Preview */}
          {topScores.length > 0 && (
            <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-lg border-2 border-primary/50 p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-slide-in-up">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-6 flex items-center justify-center gap-3 pixel-font glow-text">
                <Trophy className="h-7 w-7 md:h-8 w-8" />
                HALL OF FAME
              </h2>
              <div className="space-y-4">
                {topScores.map((score, index) => (
                  <div 
                    key={score.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-background/70 border border-primary/20 hover:bg-background/90 hover:border-primary/40 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl md:text-3xl">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </span>
                      <span className="font-medium text-base md:text-lg pixel-font">{score.player_name}</span>
                    </div>
                    <span className="text-secondary font-mono font-bold text-lg md:text-xl glow-text">
                      {formatTime(score.completion_time)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
