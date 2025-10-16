import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 py-6 px-4 mt-auto">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground pixel-font">
            Built with CSS & HTML | Pure hover mechanics, no JavaScript game logic
          </p>
          <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
            <p className="pixel-font">© 2024 Ruel McNeil. All rights reserved.</p>
            <a 
              href="https://github.com/Cruelhelp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors glow-text-sm"
            >
              <Github className="w-4 h-4" />
              <span className="pixel-font">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};