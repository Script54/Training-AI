import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  colorClass: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, icon: Icon, colorClass, trend }) => {
  return (
    <div className="glass-panel p-4 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group">
      <div className={`absolute -right-4 -top-4 opacity-10 ${colorClass} group-hover:opacity-20 transition-opacity`}>
        <Icon size={96} />
      </div>
      
      <div className="flex items-center space-x-2 z-10">
        <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
          <Icon size={20} />
        </div>
        <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">{label}</span>
      </div>

      <div className="z-10 mt-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-mono font-bold text-white">{value}</span>
          <span className="text-sm text-gray-500 font-medium">{unit}</span>
        </div>
        {trend && (
           <div className="flex items-center mt-1">
             <div className={`h-1 w-full rounded-full bg-gray-800 overflow-hidden`}>
                <div className={`h-full ${colorClass} w-2/3 animate-pulse`}></div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;