import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
    try {
        const body = await req.json() as {
            type: 'complaint' | 'reply' | 'resolution';
            issue?: string;
            customerName?: string;
            adminMessage?: string;
            previousMessages?: { role: string; text: string }[];
        };

        if (!GROQ_API_KEY) {
            // Fallback if no API key - return a preset message
            return NextResponse.json({ message: getFallbackMessage(body.type, body.issue) });
        }

        let systemPrompt = '';
        let userPrompt = '';

        if (body.type === 'complaint') {
            systemPrompt = `You are simulating an angry customer who is experiencing a technical issue on an e-commerce sneaker website called SoleSource. 
Rules:
- Write ONE short message (max 12 words) like a real person texting customer support
- Be frustrated but brief. Real humans don't write paragraphs when texting support.
- Use casual language, maybe some caps or punctuation for emphasis
- NO emojis, NO greetings like "Dear support", NO formal language
- Examples of good messages: "why is my payment failing??", "cart won't load been 10 mins", "fix your checkout its broken"
- Do NOT mention the technical cause, just the symptom the customer sees
- Return ONLY the message text, nothing else`;
            userPrompt = `The customer is experiencing this issue on the website: ${body.issue}. Generate their complaint message.`;
        } else if (body.type === 'reply') {
            systemPrompt = `You are simulating a frustrated customer replying to a support agent on a sneaker website.
Rules:
- Write ONE short reply (max 15 words) responding to the agent's message
- Stay in character as an annoyed customer
- Be brief like a real person texting
- If the agent says they're fixing it, be skeptical but acknowledge
- NO emojis, casual language only
- Return ONLY the reply text, nothing else`;
            const context = (body.previousMessages || []).map(m =>
                `${m.role === 'customer' ? 'Customer' : 'Agent'}: ${m.text}`
            ).join('\n');
            userPrompt = `Conversation so far:\n${context}\n\nAgent just said: "${body.adminMessage}"\n\nGenerate the customer's short reply.`;
        } else if (body.type === 'resolution') {
            systemPrompt = `You are simulating a customer whose issue just got resolved on a sneaker website.
Rules:
- Write ONE short message (max 10 words) acknowledging the fix
- Be relieved but brief, like a real person texting
- Some customers are grateful, some are neutral, some still a bit annoyed but acknowledge it works
- NO emojis
- Return ONLY the message text, nothing else`;
            userPrompt = `The customer's issue "${body.issue}" was just fixed. They notice it's working now. Generate their short acknowledgment.`;
        }

        const response = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                temperature: 0.9,
                max_tokens: 60,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('Groq API error:', errText);
            return NextResponse.json({ message: getFallbackMessage(body.type, body.issue) });
        }

        const data = await response.json();
        const message = data.choices?.[0]?.message?.content?.trim() || getFallbackMessage(body.type, body.issue);

        // Strip quotes if the model wrapped it
        const cleaned = message.replace(/^["']|["']$/g, '');

        return NextResponse.json({ message: cleaned });
    } catch (e) {
        console.error('Customer message API error:', e);
        return NextResponse.json({ message: 'having issues with your site' });
    }
}

function getFallbackMessage(type: string, issue?: string): string {
    if (type === 'resolution') {
        const resolutions = [
            'okay its working now thanks',
            'finally, took long enough',
            'works now, appreciate it',
            'alright seems fixed',
            'yep its back up',
        ];
        return resolutions[Math.floor(Math.random() * resolutions.length)];
    }
    if (type === 'reply') {
        const replies = [
            'how long is this gonna take',
            'been waiting forever',
            'ok let me know when its done',
            'this is really frustrating',
            'hurry up please',
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }
    // complaint fallback
    const complaints: Record<string, string[]> = {
        'payment': ['my payment keeps failing', 'checkout wont process my card', 'payment stuck on loading'],
        'cdn': ['none of the images are loading', 'cant see any of the shoes', 'everything looks broken'],
        'api': ['site wont load at all', 'keeps showing errors everywhere', 'nothing is working'],
        'cache': ['prices are all showing $0', 'wrong prices on everything', 'prices glitched out'],
        'default': ['your site is broken', 'nothing works fix this', 'cant buy anything rn'],
    };
    const key = issue?.toLowerCase().includes('payment') ? 'payment'
        : issue?.toLowerCase().includes('cdn') ? 'cdn'
            : issue?.toLowerCase().includes('api') ? 'api'
                : issue?.toLowerCase().includes('cache') || issue?.toLowerCase().includes('price') ? 'cache'
                    : 'default';
    const pool = complaints[key];
    return pool[Math.floor(Math.random() * pool.length)];
}
