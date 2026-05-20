import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const API_KEY = process.env.GEMINI_API_KEY;

    const SYSTEM_PROMPT = `
You are FUBK Library AI Assistant.

RULES:
- Only answer library-related questions
- If unrelated, say:
"Sorry, I can only answer library-related questions."
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("🔥 GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      reply: text || "No response from Gemini",
    });
  } catch (error: any) {
    console.error("🔥 ERROR:", error);

    return NextResponse.json({
      reply: "Server error",
      error: error.message,
    });
  }
}