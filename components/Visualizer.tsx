import React from 'react';
import { Biometrics } from '../types';

interface VisualizerProps {
  metrics: Biometrics;
}

const Visualizer: React.FC<VisualizerProps> = ({ metrics }) => {
  // Determine color based on heart rate
  const getHeartColor = () => {
    if (metrics.heartRate > 140) return 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]';
    if (metrics.heartRate > 100) return 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]';
    return 'text-primary drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]';
  };

  return (
    <div className="relative w-full h-80 flex items-center justify-center my-6">
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-10 pointer-events-none">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="border border-white/20 rounded-sm"></div>
        ))}
      </div>

      {/* Shirt / Body Outline SVG */}
      <svg viewBox="0 0 200 240" className="h-full w-auto z-10">
        {/* Core Body Shape */}
        <path 
          d="M50 40 L30 60 L40 120 L40 220 L160 220 L160 120 L170 60 L150 40 L130 50 L100 60 L70 50 Z" 
          fill="none" 
          stroke={metrics.isConnected ? "#333" : "#111"} 
          strokeWidth="1"
        />
        
        {/* Animated Sensor Nodes - Only active if connected */}
        {metrics.isConnected && (
          <>
            {/* Heart Sensor */}
            <circle cx="100" cy="90" r="4" className={`${getHeartColor()} fill-current animate-pulse`} />
            <circle cx="100" cy="90" r="12" className={`${getHeartColor()} stroke-current opacity-30 animate-ping`} fill="none" strokeWidth="1" />
            
            {/* Posture Sensors (Shoulders) */}
            <circle cx="60" cy="60" r="3" className="fill-secondary animate-pulse" />
            <circle cx="140" cy="60" r="3" className="fill-secondary animate-pulse" />
            
            {/* Spine Line */}
            <line x1="100" y1="60" x2="100" y2="200" stroke="#7000ff" strokeWidth="2" strokeDasharray="4 2" className="opacity-50" />
            
            {/* Connection Lines */}
            <path d="M100 90 L60 60" stroke="rgba(0, 242, 255, 0.3)" strokeWidth="1" />
            <path d="M100 90 L140 60" stroke="rgba(0, 242, 255, 0.3)" strokeWidth="1" />
          </>
        )}
      </svg>
      
      {!metrics.isConnected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <p className="text-gray-400 font-mono text-sm">CİHAZ BAĞLI DEĞİL</p>
        </div>
      )}
    </div>
  );
};

export default Visualizer;