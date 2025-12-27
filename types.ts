export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TRAINING = 'TRAINING',
  AI_COACH = 'AI_COACH',
  SETTINGS = 'SETTINGS'
}

export interface Biometrics {
  heartRate: number;
  temperature: number;
  steps: number;
  postureScore: number; // 0-100
  batteryLevel: number;
  isConnected: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TrainingMode {
  id: string;
  name: string;
  icon: string;
  intensity: 'Low' | 'Medium' | 'High';
  description: string;
}