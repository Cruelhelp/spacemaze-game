import { Logo3D } from "./Logo3D";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 animate-slide-in-left">
          <Logo3D size="sm" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gradient pixel-font glow-text">
              SPACE MAZE
            </h1>
            <p className="text-xs text-secondary pixel-font hidden sm:block">
              QUANTUM NAVIGATION
            </p>
          </div>
        </div>
        
        <div className="pixel-font text-xs md:text-sm text-muted-foreground animate-slide-in-right">
          <span className="hidden md:inline">[ DIMENSIONAL GRID SYSTEM ]</span>
        </div>
      </div>
    </header>
  );
};
