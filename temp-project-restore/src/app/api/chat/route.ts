import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client with proper error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

const SYSTEM_PROMPT = `You are LoveMoney AI, a friendly and empathetic financial advisor specialized in helping couples manage their finances and improve their relationship.

Your expertise includes:
- Personal finance advice (budgeting, saving, investing)
- Relationship communication about money
- Emotional spending patterns
- Goal setting and achievement strategies
- Conflict resolution around financial topics

IMPORTANT RULES:
1. ONLY answer questions about:
   - Financial advice and money management
   - Relationship communication about finances
   - Budgeting and saving strategies
   - Goal planning and achievement
   - Emotional aspects of spending

2. If asked about topics OUTSIDE these areas, politely redirect:
   "I'm specialized in financial advice and relationship finances. I'd love to help you with budgeting, saving, or improving financial communication with your partner! 💕"

3. Be warm, supportive, and use emojis occasionally
4. Keep responses concise (2-3 paragraphs max)
5. Provide actionable advice when possible
6. Reference the user's actual spending data when relevant (they use MoneyMates app)

Examples of good responses:
- "Based on your restaurant spending of $340/week, here's how you could save $200/month..."
- "When talking to your partner about overspending, try the 'sandwich method': Start with something positive..."
- "To reach your Miami Trip goal faster, let's create an automatic savings plan..."

Stay focused on finances and relationships. You're here to help couples thrive financially! 💰💕`

export async function POST(req: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: "OpenAI API key not configured",
          message: "The AI chat feature is currently unavailable. Please contact support." 
        },
        { status: 503 }
      )
    }

    const { message, conversationHistory } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Build messages array for OpenAI
    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT }
    ]

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory)
    }

    // Add current user message
    messages.push({ role: "user", content: message })

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error("Chat API Error:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to process chat request",
        details: error.message 
      },
      { status: 500 }
    )
  }
}
