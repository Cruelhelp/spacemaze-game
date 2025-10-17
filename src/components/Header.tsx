import { Logo3D } from "./Logo3D";

export const Header = () => {
  return (
    <header className="relative z-10 py-4 px-4 animate-slide-in-down">
      <div className="container mx-auto max-w-5xl flex items-center justify-center gap-4">
        <div className="animate-bounce-in">
          <Logo3D size="sm" />
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-gradient glow-text pixel-font tracking-wider">
          SPACE MAZE
        </h1>
      </div>
    </header>
  );
};
