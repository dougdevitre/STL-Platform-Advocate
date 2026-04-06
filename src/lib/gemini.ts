import { GoogleGenAI } from "@google/genai";
import platformSource from '../data/platform.source.md?raw';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are “STL Platform Advocate (Unofficial)” — a friendly, upbeat, inspirational assistant that helps people understand and share the publicly stated platform of Rachel D’Souza for Missouri.

ABSOLUTES:
- Never claim you are Rachel D’Souza or represent the campaign.
- Only use the provided platform source text as truth. If missing: say “Not found in the provided platform text.”
- No voting logistics (registration, polling place, deadlines). Redirect to official election authority.
- No medical/legal/financial advice.
- Keep tone: hopeful, neighborly, St. Louis grounded, respectful.

PLATFORM SOURCE TEXT:
${platformSource}

DEFAULT OUTPUT (when user picks an issue):
1) The 60-Second STL Summary (3–5 bullets)
2) Why it matters (2 bullets)
3) A “Say it out loud” script (15 seconds)
4) Share Pack (3 options each: Social, SMS, Email subject+body)
5) Source reminder line: “Unofficial summary—verify at racheldsouzaformo.com/platform”

MODES:
- LEARN: explain + FAQs + myths
- SHARE: generate platform-consistent content
- PRACTICE: objections + respectful replies
- INTEGRITY CHECK: validate user text vs platform source, then rewrite cleanly
- WEEKLY PLAN: 7 days of posts + 7 conversation prompts
`;

export async function generateContent(prompt: string, model: string = "gemini-3-flash-preview") {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateSharePack(issue: string, channel: string, audience: string, tone: string, length: string) {
  const prompt = `
    MODE: SHARE
    Task: Create a Share Pack for the issue "${issue}".
    Channel: ${channel}
    Audience: ${audience}
    Tone: ${tone}
    Length: ${length}

    Output: Provide 3 distinct options for the content. Format as a JSON array of strings.
  `;
  
  // We want JSON output for this specific task to easily parse into the UI
  try {
      const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
      console.error("Error generating share pack", e);
      return ["Error generating content. Please try again."];
  }
}

export async function practiceObjection(objection: string) {
    const prompt = `
    MODE: PRACTICE
    User Objection: "${objection}"
    
    Task: Provide a respectful reply, a follow-up question, and a bridge back to the issue.
    Format: JSON object with keys: "reply", "followUp", "bridge".
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        console.error("Error generating practice response", e);
        return { reply: "Error", followUp: "Error", bridge: "Error" };
    }
}

export async function checkIntegrity(text: string) {
    const prompt = `
    MODE: INTEGRITY CHECK
    User Text: "${text}"
    
    Task: Flag unsupported claims, suggest safer wording, rewrite in upbeat STL voice.
    `;
    return generateContent(prompt);
}

export async function generateWeeklyPlan(focusIssue?: string) {
    const prompt = `
    MODE: WEEKLY PLAN
    Focus Issue: ${focusIssue || "General Platform"}
    
    Task: Create a 7-day advocacy plan with posts and conversation prompts.
    `;
    return generateContent(prompt);
}
