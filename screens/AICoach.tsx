import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import { Biometrics, ChatMessage } from '../types';
import { sendChatMessage, generateDailySuggestion } from '../services/geminiService';

interface AICoachProps {
  metrics: Biometrics;
}

const AICoach: React.FC<AICoachProps> = ({ metrics }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      text: "Merhaba. Ben Training AI. Sensörlerinle senkronize oldum. Bugün antrenmanına nasıl yardımcı olabilirim?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate a daily tip on first load of this screen
  useEffect(() => {
    if (!dailyTip && metrics.isConnected) {
      const fetchTip = async () => {
        const tip = await generateDailySuggestion(metrics);
        setDailyTip(tip);
      };
      fetchTip();
    }
  }, [metrics.isConnected, dailyTip, metrics]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendChatMessage(userMsg.text, history, metrics);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header Area */}
      <div className="p-4 border-b border-white/10 bg-surface z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-full">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Training AI</h2>
            <p className="text-xs text-primary flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Çevrimiçi & İzleniyor
            </p>
          </div>
        </div>

        {/* Daily Insight Banner */}
        {dailyTip && (
          <div className="mt-4 p-3 bg-white/5 border border-primary/20 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-start space-x-2">
              <Sparkles size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-200 italic">"{dailyTip}"</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              msg.role === 'user' 
                ? 'bg-primary/20 text-white rounded-tr-none border border-primary/20' 
                : 'bg-card text-gray-200 rounded-tl-none border border-white/5'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className="text-[10px] opacity-40 mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-card rounded-2xl rounded-tl-none p-3 border border-white/5 flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-primary"/>
                <span className="text-xs text-gray-400">Veriler işleniyor...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-[80px] left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Antrenmanın hakkında sor..."
            className="w-full bg-gray-900 border border-white/10 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-primary transition-colors pr-12 shadow-lg shadow-primary/5"
            disabled={!metrics.isConnected && false} // Allow chat even if disconnected for demo
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary rounded-full text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoach;