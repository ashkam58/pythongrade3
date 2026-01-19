import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getGeminiHelp = async (
  context: string,
  userCode: string,
  userQuestion: string
): Promise<string> => {
  try {
    const prompt = `
      You are a friendly, encouraging coding tutor for kids aged 8-12 learning Python.
      The current game context is: ${context}.
      The kid's current code is: \`${userCode}\`.
      The kid asks: "${userQuestion}".

      Keep the answer short (under 50 words), fun, and use emojis. 
      Don't just give the answer, guide them to it.
      If they are doing well, celebrate!
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Oops! My brain circuit is fuzzy. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the cloud right now. ☁️";
  }
};

export const generateBugChallenge = async (): Promise<{broken: string, hint: string}> => {
    try {
        const prompt = `
            Generate a simple buggy Python line of code for a beginner kid.
            Concepts: print(), strings, numbers.
            Return ONLY JSON: {"broken": "code_here", "hint": "hint_here"}
            Example errors: missing quotes, missing parenthesis, misspelled print.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        
        const text = response.text || '{}';
        return JSON.parse(text);
    } catch (e) {
        return { broken: 'print(Hello)', hint: 'Strings need quotes!' };
    }
}
