import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import AICoach from './screens/AICoach';
import Training from './screens/Training';
import { AppView, Biometrics } from './types';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // Simulated State for Sensor Fusion (ESP32)
  const [metrics, setMetrics] = useState<Biometrics>({
    heartRate: 72,
    temperature: 36.5,
    steps: 1240,
    postureScore: 85,
    batteryLevel: 92,
    isConnected: false
  });

  // Effect to simulate incoming Bluetooth data when connected
  useEffect(() => {
    let interval: any;
    if (metrics.isConnected) {
      interval = setInterval(() => {
        setMetrics(prev => {
          // Add some randomness to simulate live sensors
          const hrVariation = Math.floor(Math.random() * 5) - 2;
          const stepIncrement = Math.random() > 0.7 ? 1 : 0;
          
          return {
            ...prev,
            heartRate: Math.max(60, Math.min(180, prev.heartRate + hrVariation)),
            steps: prev.steps + stepIncrement,
            // Drifts slightly
            temperature: 36.5 + (Math.random() * 0.2), 
            postureScore: Math.max(50, Math.min(100, prev.postureScore + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
            batteryLevel: prev.batteryLevel > 0 ? prev.batteryLevel - 0.01 : 0 // Very slow drain
          };
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [metrics.isConnected]);

  const toggleConnection = () => {
    // Simulate connection delay
    if (!metrics.isConnected) {
        // Here we would use navigator.bluetooth.requestDevice() in a real scenario
        setMetrics(prev => ({ ...prev, isConnected: true }));
    } else {
        setMetrics(prev => ({ ...prev, isConnected: false }));
    }
  };

  const renderScreen = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard metrics={metrics} toggleConnection={toggleConnection} />;
      case AppView.TRAINING:
        return <Training />;
      case AppView.AI_COACH:
        return <AICoach metrics={metrics} />;
      case AppView.SETTINGS:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Settings size={48} className="mb-4 opacity-50" />
            <p>Profil ve Ayarlar</p>
            <p className="text-xs mt-2">v1.0.0</p>
          </div>
        );
      default:
        return <Dashboard metrics={metrics} toggleConnection={toggleConnection} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderScreen()}
    </Layout>
  );
};

export default App;