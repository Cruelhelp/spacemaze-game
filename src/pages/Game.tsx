import { useState, useEffect } from "react";
import { StarField } from "@/components/StarField";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Home, Trophy } from "lucide-react";
import "./game-styles.css";

const Game = () => {
  const navigate = useNavigate();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [comment, setComment] = useState("");
  const [startTime, setStartTime] = useState<number>(0);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const gameEndTrigger = document.getElementById("game-end-trigger") as HTMLInputElement;
    
    const handleGameEnd = () => {
      if (gameEndTrigger?.checked) {
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        setCompletionTime(timeTaken);
        setGameCompleted(true);
      }
    };

    gameEndTrigger?.addEventListener("change", handleGameEnd);
    return () => gameEndTrigger?.removeEventListener("change", handleGameEnd);
  }, [startTime]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = ms % 1000;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10).toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leaderboard").insert({
        player_name: playerName.trim(),
        completion_time: completionTime,
        comment: comment.trim() || null,
      });

      if (error) throw error;

      toast.success("Score submitted successfully!");
      navigate("/leaderboard");
    } catch (error) {
      console.error("Error submitting score:", error);
      toast.error("Failed to submit score");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10"
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
        
        <div className="text-2xl font-mono text-gradient glow-text">
          {formatTime(Date.now() - startTime)}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate("/leaderboard")}
          className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10"
        >
          <Trophy className="w-4 h-4" />
          Leaderboard
        </Button>
      </div>

      {/* Game Container */}
      <div className="game-container">
        <div className="center">
          <input type="checkbox" id="level-one" />
          <div className="level" data-level="1">
            <div className="step start" data-r="0" data-c="0"></div>
            <div className="step" data-r="0" data-c="1"></div>
            <div className="step" data-r="1" data-c="1"></div>
            <div className="step" data-r="2" data-c="1"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="3" data-c="3"></div>
            <div className="step" data-r="2" data-c="3"></div>
            <div className="step" data-r="2" data-c="4"></div>
            <div className="step" data-r="3" data-c="4"></div>
            <div className="step finish" data-r="4" data-c="4">
              <label className="goal" htmlFor="level-one"></label>
            </div>
          </div>

          <input type="checkbox" id="level-two" />
          <div className="level">
            <div className="step start" data-r="4" data-c="4"></div>
            <div className="step" data-r="4" data-c="3"></div>
            <div className="step" data-r="4" data-c="2"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="3" data-c="0"></div>
            <div className="step" data-r="2" data-c="0"></div>
            <div className="step" data-r="1" data-c="0"></div>
            <div className="step finish" data-r="1" data-c="1">
              <label className="goal" htmlFor="level-two"></label>
            </div>
          </div>

          <input type="checkbox" id="level-three" />
          <div className="level">
            <div className="step start" data-r="1" data-c="1"></div>
            <div className="step" data-r="1" data-c="2"></div>
            <div className="step" data-r="1" data-c="3"></div>
            <div className="step" data-r="1" data-c="4"></div>
            <div className="step" data-r="0" data-c="4"></div>
            <div className="step" data-r="0" data-c="3"></div>
            <div className="step" data-r="2" data-c="3"></div>
            <div className="step" data-r="3" data-c="3"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="3" data-c="0"></div>
            <div className="step" data-r="2" data-c="0"></div>
            <div className="step" data-r="1" data-c="0"></div>
            <div className="step finish" data-r="0" data-c="0">
              <label className="goal" htmlFor="level-three"></label>
            </div>
          </div>

          <input type="checkbox" id="level-four" />
          <div className="level">
            <div className="step start" data-r="0" data-c="0"></div>
            <div className="step" data-r="0" data-c="1"></div>
            <div className="step" data-r="0" data-c="2"></div>
            <div className="step" data-r="1" data-c="2"></div>
            <div className="step" data-r="2" data-c="2"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="3" data-c="0"></div>
            <div className="step" data-r="4" data-c="0"></div>
            <div className="step" data-r="4" data-c="1"></div>
            <div className="step" data-r="4" data-c="2"></div>
            <div className="step" data-r="4" data-c="3"></div>
            <div className="step finish" data-r="4" data-c="4">
              <label className="goal" htmlFor="game-end-trigger"></label>
            </div>
          </div>

          <input type="checkbox" id="game-end-trigger" style={{ display: "none" }} />
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={gameCompleted} onOpenChange={setGameCompleted}>
        <DialogContent className="bg-card border-primary/50">
          <DialogHeader>
            <DialogTitle className="text-3xl text-gradient glow-text text-center">
              Mission Complete! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Your Time</p>
              <p className="text-4xl font-mono text-gradient">{formatTime(completionTime)}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pilot Name</label>
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-background border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mission Log (Optional)</label>
              <Textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-background border-primary/30 focus:border-primary min-h-[100px]"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 animate-pulse-glow"
              >
                {isSubmitting ? "Submitting..." : "Submit Score"}
              </Button>
              
              <Button
                onClick={() => navigate("/leaderboard")}
                variant="outline"
                className="border-primary/50 hover:border-primary hover:bg-primary/10"
              >
                View Leaderboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
