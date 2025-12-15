import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Fallback or error handling if key is missing is handled in the UI component usually, 
// but here we just ensure the client is created if the key exists.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAIResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "AI Service Unavailable: Missing API Key.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are HemoBot, a knowledgeable and empathetic assistant for a blood donation application. Your goal is to answer questions about donor eligibility, preparation, and the donation process briefly and clearly. If asked about medical advice, strictly advise consulting a doctor.",
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the knowledge base right now.";
  }
};