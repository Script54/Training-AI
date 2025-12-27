import React, { useEffect } from 'react';
import { Activity, Heart, Thermometer, Zap, Bluetooth, BluetoothOff, RefreshCw } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Visualizer from '../components/Visualizer';
import { Biometrics } from '../types';

interface DashboardProps {
  metrics: Biometrics;
  toggleConnection: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics, toggleConnection }) => {
  
  return (
    <div className="flex flex-col h-full space-y-4 p-4 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Durumum</h1>
          <p className="text-xs text-gray-500 font-mono">ESP32 FÜZYON ÇEKİRDEĞİ v1.4</p>
        </div>
        <button 
          onClick={toggleConnection}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            metrics.isConnected 
              ? 'bg-primary/20 text-primary border border-primary/50' 
              : 'bg-red-500/20 text-red-500 border border-red-500/50'
          }`}
        >
          {metrics.isConnected ? <Bluetooth size={14} /> : <BluetoothOff size={14} />}
          <span>{metrics.isConnected ? 'BAĞLI' : 'KOPUK'}</span>
        </button>
      </div>

      {/* Visualizer (The T-Shirt) */}
      <Visualizer metrics={metrics} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard 
          label="Nabız" 
          value={metrics.isConnected ? metrics.heartRate : '--'} 
          unit="BPM" 
          icon={Heart} 
          colorClass="text-red-500" 
          trend="up"
        />
        <MetricCard 
          label="Adım" 
          value={metrics.isConnected ? metrics.steps.toLocaleString() : '--'} 
          unit="Bugün" 
          icon={Activity} 
          colorClass="text-primary" 
        />
        <MetricCard 
          label="Sıcaklık" 
          value={metrics.isConnected ? metrics.temperature : '--'} 
          unit="°C" 
          icon={Thermometer} 
          colorClass="text-orange-400" 
        />
        <MetricCard 
          label="Duruş" 
          value={metrics.isConnected ? `${metrics.postureScore}%` : '--'} 
          unit="Puan" 
          icon={RefreshCw} 
          colorClass="text-secondary" 
        />
      </div>

      {/* Battery Status */}
      <div className="glass-panel p-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500/20 p-2 rounded-full">
            <Zap size={18} className="text-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-200">Batarya Modülü</p>
            <p className="text-xs text-gray-500">Tahmini 8s kaldı</p>
          </div>
        </div>
        <span className="text-xl font-mono font-bold text-green-400">{metrics.batteryLevel}%</span>
      </div>
    </div>
  );
};

export default Dashboard;