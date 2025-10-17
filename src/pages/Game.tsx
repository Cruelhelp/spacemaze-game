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
import { CodeViewer } from "@/components/CodeViewer";
import { Footer } from "@/components/Footer";
import "./game-styles.css";

const TAUNTS = [
  "Really? That's the best you got?",
  "My grandmother has better cursor control!",
  "ERROR: Skill not found",
  "Oops! Try using your brain this time",
  "PATHETIC. Start over, rookie",
  "Even a potato could do better",
  "Quantum mechanics defeated by a mouse",
  "RESET! Hope you learned something",
  "Is this your first time using a cursor?",
  "The universe is laughing at you",
  "Did you even TRY? LOL",
  "Wow. Just... WOW. Embarrassing.",
  "Your hand slipped? Or is that your skill level?",
  "Computer says NO",
  "404: Talent not found",
  "Git gud scrub",
  "Back to the tutorial for you",
  "Did that HURT your ego?",
  "FAIL compilation material right here",
  "Press F to pay respects... to your dignity",
];

const Game = () => {
  const navigate = useNavigate();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [comment, setComment] = useState("");
  const [startTime, setStartTime] = useState<number>(0);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [taunt, setTaunt] = useState<string>("");
  const [showTaunt, setShowTaunt] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now() - startTime);
    }, 10);
    return () => clearInterval(timer);
  }, [startTime]);

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

  useEffect(() => {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#game-end-trigger)');
    
    const handleReset = (e: Event) => {
      const checkbox = e.target as HTMLInputElement;
      if (checkbox.id !== "game-end-trigger" && !checkbox.checked) {
        const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
        setTaunt(randomTaunt);
        setShowTaunt(true);
        setTimeout(() => setShowTaunt(false), 2000);
      }
    };

    allCheckboxes.forEach(cb => {
      cb.addEventListener('change', handleReset);
    });

    return () => {
      allCheckboxes.forEach(cb => {
        cb.removeEventListener('change', handleReset);
      });
    };
  }, []);

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
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <StarField />
      <CodeViewer />
      
      {/* Taunt Display */}
      {showTaunt && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] pixel-font text-lg md:text-3xl text-destructive glow-text animate-pulse-glow p-6 md:p-8 bg-background/90 border-2 border-destructive rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.5)] max-w-[90vw] text-center">
          {taunt}
        </div>
      )}
      
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10 pixel-font text-xs md:text-sm px-3 md:px-4"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">HOME</span>
        </Button>
        
        <div className="text-xl md:text-3xl font-mono text-gradient glow-text pixel-font px-3 md:px-4 py-2 bg-background/50 rounded-lg border border-primary/30">
          {formatTime(currentTime)}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate("/leaderboard")}
          className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10 pixel-font text-xs md:text-sm px-3 md:px-4"
        >
          <Trophy className="w-4 h-4" />
          <span className="hidden sm:inline">RANKS</span>
        </Button>
      </div>

      {/* Game Container */}
      <div className="game-container flex-1">
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
              <label className="goal" htmlFor="level-four"></label>
            </div>
          </div>

          <input type="checkbox" id="level-five" />
          <div className="level">
            <div className="step start" data-r="4" data-c="4"></div>
            <div className="step" data-r="3" data-c="4"></div>
            <div className="step" data-r="2" data-c="4"></div>
            <div className="step" data-r="1" data-c="4"></div>
            <div className="step" data-r="0" data-c="4"></div>
            <div className="step" data-r="0" data-c="3"></div>
            <div className="step" data-r="0" data-c="2"></div>
            <div className="step" data-r="1" data-c="2"></div>
            <div className="step" data-r="1" data-c="1"></div>
            <div className="step finish" data-r="1" data-c="0">
              <label className="goal" htmlFor="level-five"></label>
            </div>
          </div>

          <input type="checkbox" id="level-six" />
          <div className="level">
            <div className="step start" data-r="1" data-c="0"></div>
            <div className="step" data-r="2" data-c="0"></div>
            <div className="step" data-r="2" data-c="1"></div>
            <div className="step" data-r="2" data-c="2"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="4" data-c="2"></div>
            <div className="step" data-r="4" data-c="3"></div>
            <div className="step" data-r="3" data-c="3"></div>
            <div className="step" data-r="2" data-c="3"></div>
            <div className="step" data-r="2" data-c="4"></div>
            <div className="step finish" data-r="1" data-c="4">
              <label className="goal" htmlFor="level-six"></label>
            </div>
          </div>

          <input type="checkbox" id="level-seven" />
          <div className="level">
            <div className="step start" data-r="1" data-c="4"></div>
            <div className="step" data-r="0" data-c="4"></div>
            <div className="step" data-r="0" data-c="3"></div>
            <div className="step" data-r="1" data-c="3"></div>
            <div className="step" data-r="1" data-c="2"></div>
            <div className="step" data-r="0" data-c="2"></div>
            <div className="step" data-r="0" data-c="1"></div>
            <div className="step" data-r="1" data-c="1"></div>
            <div className="step" data-r="2" data-c="1"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="4" data-c="1"></div>
            <div className="step finish" data-r="4" data-c="0">
              <label className="goal" htmlFor="level-seven"></label>
            </div>
          </div>

          <input type="checkbox" id="level-eight" />
          <div className="level">
            <div className="step start" data-r="4" data-c="0"></div>
            <div className="step" data-r="4" data-c="1"></div>
            <div className="step" data-r="3" data-c="1"></div>
            <div className="step" data-r="3" data-c="2"></div>
            <div className="step" data-r="3" data-c="3"></div>
            <div className="step" data-r="2" data-c="3"></div>
            <div className="step" data-r="1" data-c="3"></div>
            <div className="step" data-r="1" data-c="2"></div>
            <div className="step" data-r="0" data-c="2"></div>
            <div className="step" data-r="0" data-c="1"></div>
            <div className="step" data-r="0" data-c="0"></div>
            <div className="step finish" data-r="1" data-c="0">
              <label className="goal" htmlFor="level-eight"></label>
            </div>
          </div>

          <input type="checkbox" id="game-end-trigger" style={{ display: "none" }} />
        </div>
      </div>

      <Footer />

      {/* Completion Dialog */}
      <Dialog open={gameCompleted} onOpenChange={setGameCompleted}>
        <DialogContent className="bg-card/95 backdrop-blur-lg border-2 border-primary/50 shadow-[0_0_100px_rgba(168,85,247,0.5)]">
          <DialogHeader>
            <DialogTitle className="text-3xl md:text-4xl text-gradient glow-text text-center pixel-font">
              MISSION COMPLETE! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-2 pixel-font text-xs md:text-sm">YOUR TIME</p>
              <p className="text-4xl md:text-5xl font-mono text-gradient glow-text pixel-font">{formatTime(completionTime)}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium pixel-font">PILOT NAME</label>
              <Input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-background border-2 border-primary/30 focus:border-primary pixel-font"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium pixel-font">MISSION LOG (Optional)</label>
              <Textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-background border-2 border-primary/30 focus:border-primary min-h-[100px] pixel-font"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 animate-pulse-glow pixel-font text-sm"
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT SCORE"}
              </Button>
              
              <Button
                onClick={() => navigate("/leaderboard")}
                variant="outline"
                className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 pixel-font text-sm"
              >
                VIEW RANKS
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
