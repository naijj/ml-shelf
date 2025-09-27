import React, { useRef, useEffect, useState } from 'react';

interface GradientBlindsProps {
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mouseDampening?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right';
  mixBlendMode?: string;
  className?: string;
}

export function GradientBlinds({
  gradientColors = ['#FF9FFC', '#5227FF'],
  angle = 0,
  noise = 0.3,
  blindCount = 12,
  blindMinWidth = 50,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  mouseDampening = 0.15,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten',
  className = ''
}: GradientBlindsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setMousePosition(prev => ({
          x: prev.x + (x - prev.x) * mouseDampening,
          y: prev.y + (y - prev.y) * mouseDampening
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseDampening]);

  const createGradient = () => {
    return `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`;
  };

  const createBlinds = () => {
    const blinds = [];
    const blindWidth = 100 / blindCount;
    
    for (let i = 0; i < blindCount; i++) {
      const offset = i * blindWidth;
      const opacity = 0.7 + (Math.sin(i * 0.5) * 0.3);
      
      blinds.push(
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: createGradient(),
            clipPath: `polygon(${offset}% 0%, ${offset + blindWidth}% 0%, ${offset + blindWidth + 10}% 100%, ${offset + 10}% 100%)`,
            opacity: opacity,
            transform: `skewX(${-15 + i * 2}deg) translateX(${Math.sin(i * 0.3) * 5}px)`,
            filter: `blur(${noise}px) brightness(${1 + Math.sin(i * 0.7) * 0.2})`,
            mixBlendMode: mixBlendMode as any
          }}
        />
      );
    }
    
    return blinds;
  };

  const spotlightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
      rgba(255, 255, 255, ${spotlightOpacity}) 0%, 
      rgba(255, 255, 255, ${spotlightOpacity * 0.5}) ${spotlightRadius * 50}%, 
      transparent ${spotlightRadius * 100}%)`,
    filter: `blur(${spotlightSoftness * 10}px)`,
    mixBlendMode: 'overlay' as any
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ 
        background: '#0a0a0a',
        transform: `rotate(${distortAmount}deg)`
      }}
    >
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: createGradient(),
          opacity: 0.3
        }}
      />
      
      {/* Gradient blinds */}
      {createBlinds()}
      
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={spotlightStyle}
      />
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(${shineDirection === 'left' ? '45deg' : '-45deg'}, 
            transparent 0%, 
            rgba(255, 255, 255, 0.1) 45%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(255, 255, 255, 0.1) 55%, 
            transparent 100%)`,
          animation: 'shine 3s ease-in-out infinite',
          mixBlendMode: 'overlay' as any
        }}
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply' as any
        }}
      />
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%); }
          50% { transform: translateX(100%) translateY(100%); }
          100% { transform: translateX(-100%) translateY(-100%); }
        }
      `}</style>
    </div>
  );
}

export default GradientBlinds;