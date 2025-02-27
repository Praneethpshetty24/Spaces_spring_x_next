import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function cleanJsonResponse(text) {
  // Remove markdown code block syntax if present
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  // Remove any leading/trailing whitespace
  text = text.trim();
  return text;
}

export async function POST(request) {
  try {
    const { code, problem } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Evaluate this code solution. Respond with ONLY a JSON object - no markdown, no code blocks, no additional text.

Problem: ${problem.description}

Submitted Solution:
${code}

Required exact response format:
{
  "isCorrect": true/false,
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "feedback": "Your detailed feedback here"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Clean and parse the JSON response
      const cleanedText = cleanJsonResponse(text);
      console.log('Cleaned response:', cleanedText); // For debugging
      const evaluation = JSON.parse(cleanedText);
      
      // Validate the required fields
      if (!evaluation.hasOwnProperty('isCorrect') || 
          !evaluation.hasOwnProperty('timeComplexity') ||
          !evaluation.hasOwnProperty('spaceComplexity') ||
          !evaluation.hasOwnProperty('feedback')) {
        throw new Error('Invalid response format');
      }
      
      return Response.json(evaluation);
    } catch (parseError) {
      // If JSON parsing fails, create a formatted response
      console.error('AI response parsing failed:', text);
      return Response.json({
        isCorrect: false,
        timeComplexity: "N/A",
        spaceComplexity: "N/A",
        feedback: "Your solution was processed, but we encountered an issue analyzing it. Please try submitting again."
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return Response.json({
      isCorrect: false,
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      feedback: "Failed to evaluate submission. Please try again."
    }, { status: 200 }); // Return 200 instead of 500 to handle gracefully on frontend
  }
}
