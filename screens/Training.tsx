import React, { useState } from 'react';
import { Play, Pause, FastForward, Timer, Dumbbell, Zap, Wind } from 'lucide-react';
import { TrainingMode } from '../types';

const modes: TrainingMode[] = [
  { id: '1', name: 'Kardiyo Patlaması', icon: 'wind', intensity: 'High', description: 'Dayanıklılık odaklı.' },
  { id: '2', name: 'Güç Antrenmanı', icon: 'dumbbell', intensity: 'Medium', description: 'Kas gelişimi.' },
  { id: '3', name: 'HIIT', icon: 'zap', intensity: 'High', description: 'Aralıklı antrenman.' },
];

const Training: React.FC = () => {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  // Simple timer effect
  React.useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'wind': return <Wind size={24} />;
      case 'dumbbell': return <Dumbbell size={24} />;
      case 'zap': return <Zap size={24} />;
      default: return <Zap size={24} />;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 pb-24 overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Antrenman Modları</h1>

      {/* Active Session Card */}
      <div className={`w-full rounded-2xl p-6 mb-8 transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-secondary/80 to-purple-900 border border-secondary' : 'bg-card border border-white/5'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Antrenman Süresi</h3>
            <div className="text-5xl font-mono font-bold text-white mt-2 tracking-tighter">
              {formatTime(timer)}
            </div>
          </div>
          <Timer className={isActive ? "text-white animate-pulse" : "text-gray-600"} size={32} />
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 py-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all ${
              isActive ? 'bg-white text-black hover:bg-gray-200' : 'bg-primary text-black hover:bg-cyan-400'
            }`}
          >
            {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            <span>{isActive ? 'DURAKLAT' : 'BAŞLAT'}</span>
          </button>
          {isActive && (
             <button 
             onClick={() => { setIsActive(false); setTimer(0); setActiveMode(null); }}
             className="w-14 h-14 bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center border border-red-500/50"
           >
             <div className="w-4 h-4 bg-current rounded-sm"></div>
           </button>
          )}
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Mevcut Programlar</h3>
      
      <div className="space-y-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`w-full flex items-center p-4 rounded-xl border transition-all ${
              activeMode === mode.id 
                ? 'bg-white/10 border-primary shadow-[0_0_15px_rgba(0,242,255,0.2)]' 
                : 'bg-card border-white/5 hover:bg-white/5'
            }`}
          >
            <div className={`p-3 rounded-lg mr-4 ${activeMode === mode.id ? 'bg-primary text-black' : 'bg-gray-800 text-gray-400'}`}>
              {getIcon(mode.icon)}
            </div>
            <div className="text-left flex-1">
              <h4 className={`font-bold ${activeMode === mode.id ? 'text-white' : 'text-gray-300'}`}>{mode.name}</h4>
              <p className="text-xs text-gray-500">{mode.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded border ${
              mode.intensity === 'High' ? 'border-red-500 text-red-500' : 
              mode.intensity === 'Medium' ? 'border-yellow-500 text-yellow-500' : 'border-green-500 text-green-500'
            }`}>
              {mode.intensity === 'High' ? 'Yüksek' : mode.intensity === 'Medium' ? 'Orta' : 'Düşük'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Training;