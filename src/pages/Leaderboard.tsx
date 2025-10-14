import { StarField } from "@/components/StarField";
import { Logo3D } from "@/components/Logo3D";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Home, Play, Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const navigate = useNavigate();

  const { data: scores, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("completion_time", { ascending: true })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
  });

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

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50";
    if (index === 1) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
    if (index === 2) return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/50";
    return "bg-card/30 border-primary/20";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          
          <div className="flex items-center gap-4">
            <Logo3D size="sm" />
            <h1 className="text-4xl font-bold text-gradient glow-text">Leaderboard</h1>
          </div>
          
          <Button 
            onClick={() => navigate("/game")}
            className="gap-2 bg-primary hover:bg-primary/90 animate-pulse-glow"
          >
            <Play className="w-4 h-4" />
            Play
          </Button>
        </div>

        {/* Leaderboard */}
        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-primary/30 p-6">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading scores...
            </div>
          ) : scores && scores.length > 0 ? (
            <div className="space-y-3">
              {scores.map((score, index) => (
                <div 
                  key={score.id}
                  className={`p-4 rounded-lg border transition-all hover:scale-[1.02] ${getRankColor(index)}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(index) || (
                        <span className="text-2xl font-bold text-muted-foreground">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-xl font-bold truncate">{score.player_name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(score.created_at)}
                        </span>
                      </div>
                      
                      {score.comment && (
                        <p className="text-sm text-muted-foreground italic truncate">
                          "{score.comment}"
                        </p>
                      )}
                    </div>

                    {/* Time */}
                    <div className="text-right">
                      <div className="text-2xl font-mono text-secondary font-bold">
                        {formatTime(score.completion_time)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No scores yet. Be the first!</p>
              <Button 
                onClick={() => navigate("/game")}
                className="bg-primary hover:bg-primary/90"
              >
                Start Playing
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
