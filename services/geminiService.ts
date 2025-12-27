import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Biometrics } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = "gemini-3-flash-preview";

export const generateDailySuggestion = async (metrics: Biometrics): Promise<string> => {
  try {
    const prompt = `
      Sen "Training AI" adında, akıllı bir spor tişörtüne entegre edilmiş gelişmiş bir yapay zekasın.
      Aşağıdaki kullanıcı biyometrik verilerini analiz et ve kısa, motive edici, Türkçe bir günlük öneri ver (maksimum 2 cümle).
      
      Mevcut Veriler:
      - Nabız: ${metrics.heartRate} bpm
      - Vücut Sıcaklığı: ${metrics.temperature}°C
      - Bugünkü Adım: ${metrics.steps}
      - Duruş Puanı: ${metrics.postureScore}/100
      
      Ton: Fütüristik, Profesyonel, Motive Edici. Yanıtı Türkçe ver.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "Sistemler senkronize ediliyor. Aktif kalın.";
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return "AI analizi alınamadı. Ağ bağlantınızı kontrol edin.";
  }
};

export const sendChatMessage = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[],
  metrics: Biometrics
): Promise<string> => {
  try {
    const systemInstruction = `
      Sen "Training AI"sın, akıllı bir biyomekanik tişörtün yapay zeka sesisin.
      Kullanıcının gerçek zamanlı sensör verilerine erişimin var (aşağıda simüle edilmiştir).
      
      Kullanıcının Canlı Durumu:
      - Nabız: ${metrics.heartRate} bpm
      - Adım: ${metrics.steps}
      - Duruş: ${metrics.postureScore}/100 (Yüksek iyidir)
      
      Cevaplarını Türkçe, kısa, yararlı ve fitness, sağlık veya tişörtün durumu ile ilgili tut.
      Kullanıcı istatistiklerini sorarsa yukarıdaki Canlı Durumu kullan.
    `;

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message,
    });

    return response.text || "Bunu tam anlayamadım.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "AI Çekirdeği ile bağlantı kararsız.";
  }
};