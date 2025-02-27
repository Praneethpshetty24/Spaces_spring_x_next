import { GoogleGenerativeAI } from '@google/generative-ai';

// Configure the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Start a chat session
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Send the message to the model
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Return the response
    return new Response(
      JSON.stringify({
        text: text,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing AI request:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Failed to process your request',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}