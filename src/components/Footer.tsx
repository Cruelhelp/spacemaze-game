import { Github, Code2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 py-8 px-4 mt-auto border-t border-primary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Tech Info */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <Code2 className="w-5 h-5 text-primary" />
            <p className="text-xs md:text-sm pixel-font">
              Pure CSS & HTML Hover Mechanics
            </p>
          </div>

          {/* Center: Copyright */}
          <div className="text-center">
            <p className="text-sm md:text-base font-bold text-foreground pixel-font glow-text-sm">
              © 2024 Ruel McNeil
            </p>
            <p className="text-xs text-muted-foreground mt-1">All Rights Reserved</p>
          </div>

          {/* Right: GitHub */}
          <a 
            href="https://github.com/Cruelhelp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <Github className="w-5 h-5 text-primary" />
            <span className="text-sm pixel-font text-foreground">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};