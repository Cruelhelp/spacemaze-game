import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Home, Trophy, Play } from "lucide-react";
import { StarField } from "@/components/StarField";
import { Logo3D } from "@/components/Logo3D";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("completion_time", { ascending: true })
        .limit(100);
      
      if (!error && data) {
        setScores(data);
      }
    };

    fetchScores();
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = ms % 1000;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <StarField />
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10 pixel-font text-sm w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              HOME
            </Button>
            
            <div className="flex items-center gap-3">
              <Logo3D size="sm" />
              <h1 className="text-3xl md:text-5xl font-black text-gradient glow-text pixel-font">
                LEADERBOARD
              </h1>
            </div>
            
            <Button 
              onClick={() => navigate("/game")}
              className="gap-2 bg-primary hover:bg-primary/90 animate-pulse-glow pixel-font text-sm w-full sm:w-auto"
            >
              <Play className="w-4 h-4" />
              PLAY
            </Button>
          </div>

          <Card className="bg-card/80 backdrop-blur-lg border-2 border-primary/50 p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            {scores.length === 0 ? (
              <p className="text-center text-muted-foreground py-12 pixel-font text-sm">
                No scores yet. Be the first to complete the challenge!
              </p>
            ) : (
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div 
                    key={score.id} 
                    className={`flex flex-col gap-3 p-4 md:p-5 rounded-lg transition-all border-2 ${
                      index < 3 
                        ? 'bg-primary/10 border-primary/40 hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]' 
                        : 'bg-background/50 border-border/30 hover:bg-background/70 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className="text-2xl md:text-3xl font-bold min-w-[3rem]">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </span>
                        <span className="text-base md:text-lg font-medium pixel-font">{score.player_name}</span>
                      </div>
                      <span className="text-secondary font-mono font-bold text-lg md:text-xl glow-text pixel-font">
                        {formatTime(score.completion_time)}
                      </span>
                    </div>
                    {score.comment && (
                      <p className="text-xs md:text-sm text-foreground/70 italic ml-12 md:ml-14 pixel-font">
                        "{score.comment}"
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground ml-12 md:ml-14 pixel-font">
                      {formatDate(score.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
