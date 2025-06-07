import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function getInterviewQA(prompt) {
  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}
