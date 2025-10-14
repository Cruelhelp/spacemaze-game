export const Logo3D = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className={`${sizeClasses[size]} perspective-3d`}>
      <div className="relative w-full h-full animate-rotate-cube">
        {/* Main cube */}
        <div 
          className="absolute inset-0 rounded-lg opacity-90"
          style={{
            background: "linear-gradient(135deg, hsl(280 60% 60%) 0%, hsl(260 50% 40%) 100%)",
            boxShadow: `
              -0.5rem 0.5rem 0.5rem hsl(260 40% 20%),
              -1rem 1rem 2rem hsl(260 60% 10% / 0.5),
              0 0 30px hsl(280 80% 65% / 0.4)
            `,
            transform: "rotateX(30deg) rotateY(-30deg)",
          }}
        />
        
        {/* Top face */}
        <div 
          className="absolute inset-0 rounded-lg opacity-70"
          style={{
            background: "linear-gradient(135deg, hsl(280 80% 70%) 0%, hsl(280 60% 60%) 100%)",
            transform: "rotateX(30deg) rotateY(-30deg) translateZ(10px)",
          }}
        />
        
        {/* Side face */}
        <div 
          className="absolute inset-0 rounded-lg opacity-50"
          style={{
            background: "linear-gradient(135deg, hsl(260 50% 40%) 0%, hsl(260 40% 30%) 100%)",
            transform: "rotateX(30deg) rotateY(-30deg) translateX(-10px)",
          }}
        />
      </div>
    </div>
  );
};
