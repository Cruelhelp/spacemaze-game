import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ORIGINAL_GAME_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Maze - Pure CSS Game</title>
    <style>
        /* Original CSS-only game logic */
        .level {
            transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1),
                        opacity 600ms cubic-bezier(0.23, 1, 0.32, 1);
            opacity: 0;
            transform: translateY(-20rem) translateX(20rem);
            pointer-events: none;
        }
        
        .level[l="1"] {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) translateX(0);
        }
        
        /* Hover reveals the next step */
        .level:hover .finish {
            transform: scale(1);
            opacity: 1;
            pointer-events: auto;
            transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
                        opacity 200ms linear;
        }
        
        input {
            opacity: 0;
            pointer-events: none;
        }
        
        /* Level progression via checkbox state */
        input:checked + .level + input + .level {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) translateX(0);
        }
        
        input:checked + .level {
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translateY(20rem) translateX(-20rem) !important;
        }
        
        .step {
            width: 10.1rem;
            height: 10.1rem;
            background: #c4bddb;
            position: absolute;
            opacity: 0;
            transform: translateY(5rem) translateX(-5rem);
            pointer-events: none;
            transition: transform 600ms cubic-bezier(0.755, 0.05, 0.855, 0.06),
                        opacity 600ms linear;
        }
        
        /* 3D cube effect with pseudo-elements */
        .step:before, .step:after {
            content: '';
            position: absolute;
            pointer-events: none !important;
        }
        
        .step:before {
            left: -20%;
            background: #57075b;
            transform-origin: 100% 100%;
            transform: skewy(-45deg);
            width: 20%;
            height: 100%;
        }
        
        .step:after {
            top: 100%;
            background: #7a5b7d;
            transform-origin: 0% 0%;
            transform: skewX(-45deg);
            height: 20%;
            width: 100%;
        }
        
        /* Hover chain - reveals path step by step */
        .step.start,
        .step:hover,
        .step:hover + .step,
        .step:hover + .path > .step:first-child {
            transform: scale(1);
            opacity: 1;
            pointer-events: auto;
            transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
                        opacity 200ms linear;
        }
        
        /* Grid positioning */
        .step[r="0"] { top: 0; }
        .step[r="1"] { top: 10rem; }
        .step[r="2"] { top: 20rem; }
        .step[r="3"] { top: 30rem; }
        .step[r="4"] { top: 40rem; }
        
        .step[c="0"] { left: 0; }
        .step[c="1"] { left: 10rem; }
        .step[c="2"] { left: 20rem; }
        .step[c="3"] { left: 30rem; }
        .step[c="4"] { left: 40rem; }
    </style>
</head>
<body>
    <div class="center">
        <!-- Level 1 -->
        <input type="checkbox" id="level-one">
        <div class="level" l="1">
            <div class="step start" r="0" c="0"></div>
            <div class="step" r="0" c="1"></div>
            <div class="step" r="1" c="1"></div>
            <!-- ... more steps ... -->
            <div class="step finish" r="4" c="4">
                <label class="goal" for="level-one"></label>
            </div>
        </div>
        
        <!-- More levels... -->
    </div>
</body>
</html>`;

export const CodeViewer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 gap-2 border-secondary/50 hover:border-secondary hover:bg-secondary/20 pixel-font text-xs shadow-[0_0_20px_rgba(0,255,255,0.3)]"
      >
        <Code className="w-4 h-4" />
        VIEW CODE
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] bg-[#1e1e1e] border-2 border-secondary/50 shadow-[0_0_100px_rgba(0,255,255,0.5)] p-0">
          <DialogHeader className="p-6 pb-4 bg-[#2d2d30] border-b border-secondary/20">
            <DialogTitle className="text-xl text-secondary glow-text pixel-font flex items-center gap-2">
              <Code className="w-5 h-5" />
              Original CSS-Only Game Code
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Pure CSS hover mechanics • No JavaScript for game logic
            </p>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh]">
            <pre className="p-6 text-xs md:text-sm font-mono overflow-x-auto">
              <code className="text-[#d4d4d4]" style={{ fontFamily: "'Fira Code', 'Consolas', monospace" }}>
                {ORIGINAL_GAME_CODE}
              </code>
            </pre>
          </ScrollArea>
          
          <div className="p-4 bg-[#2d2d30] border-t border-secondary/20 flex justify-between items-center">
            <p className="text-xs text-muted-foreground font-mono">
              CSS transitions + hover states = interactive game
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
              className="border-secondary/50 hover:border-secondary hover:bg-secondary/20 pixel-font text-xs"
            >
              CLOSE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};