export const Logo3D = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeMap = {
    sm: { size: "w-16 h-16", depth: "12px" },
    md: { size: "w-24 h-24", depth: "20px" },
    lg: { size: "w-40 h-40", depth: "30px" },
  };
  
  const { size: sizeClass, depth } = sizeMap[size];

  return (
    <div className={`${sizeClass} perspective-3d`}>
      <div className="relative w-full h-full" style={{ 
        transform: "perspective(1000px) rotateX(30deg) rotateY(-45deg)",
        transformStyle: "preserve-3d"
      }}>
        {/* Main face - matches game tiles */}
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            background: "linear-gradient(135deg, hsl(280 60% 60%) 0%, hsl(260 50% 50%) 100%)",
            boxShadow: `
              0 0 20px hsl(280 80% 65% / 0.4),
              0 0 40px hsl(280 80% 65% / 0.2),
              inset -0.5rem 0.5rem 1rem rgba(255, 255, 255, 0.1)
            `,
          }}
        />
        
        {/* Left face - darker */}
        <div 
          className="absolute top-0 h-full opacity-100 origin-right"
          style={{
            width: depth,
            left: `-${depth}`,
            background: "linear-gradient(135deg, hsl(270 50% 30%) 0%, hsl(260 50% 25%) 100%)",
            transform: "skewY(-45deg)",
            boxShadow: "inset 2px 0 10px rgba(0, 0, 0, 0.5)",
          }}
        />
        
        {/* Bottom face - darkest */}
        <div 
          className="absolute left-0 w-full opacity-100 origin-top"
          style={{
            height: depth,
            top: "100%",
            background: "linear-gradient(135deg, hsl(260 40% 20%) 0%, hsl(270 40% 15%) 100%)",
            transform: "skewX(-45deg)",
            boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.6)",
          }}
        />
      </div>
    </div>
  );
};
