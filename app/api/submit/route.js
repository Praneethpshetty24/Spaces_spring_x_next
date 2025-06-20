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
   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Evaluate this code solution. Respond with ONLY a JSON object - no markdown, no code blocks, no additional text.

Problem: ${problem.description}

Submitted Solution:
${code}

Required exact response format:
{
  "isCorrect": true/false,
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "feedback": "Your detailed feedback here",
  "improvementSuggestions": [
    "Specific suggestion 1",
    "Specific suggestion 2",
    "Specific suggestion 3"
  ],
  "codeQuality": {
    "readability": 1-10,
    "efficiency": 1-10,
    "bestPractices": 1-10
  },
  "correctSolution": "Provide a well-formatted, properly indented solution with clear variable names. Include comments to explain key steps.",
  "solutionExplanation": "Provide a detailed step-by-step explanation of the solution approach, including the algorithm, time and space complexity analysis, and why this approach is optimal."
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
      
      // Format the time and space complexity for better display
      const timeComplexity = evaluation.timeComplexity.replace(/O\(([^)]+)\)/g, 'O($1)');
      const spaceComplexity = evaluation.spaceComplexity.replace(/O\(([^)]+)\)/g, 'O($1)');
      
      // Ensure all fields exist with defaults if missing
      const enhancedEvaluation = {
        isCorrect: evaluation.isCorrect,
        timeComplexity: timeComplexity,
        spaceComplexity: spaceComplexity,
        feedback: evaluation.feedback,
        improvementSuggestions: evaluation.improvementSuggestions || [],
        codeQuality: evaluation.codeQuality || {
          readability: 5,
          efficiency: 5,
          bestPractices: 5
        },
        correctSolution: evaluation.correctSolution || "",
        solutionExplanation: evaluation.solutionExplanation || ""
      };
      
      return Response.json(enhancedEvaluation);
    } catch (parseError) {
      // If JSON parsing fails, create a formatted response
      console.error('AI response parsing failed:', parseError.message);
      console.error('Raw response:', text);
      return Response.json({
        isCorrect: false,
        timeComplexity: "N/A",
        spaceComplexity: "N/A",
        feedback: "Your solution was processed, but we encountered an issue analyzing it. Please try submitting again.",
        improvementSuggestions: [],
        codeQuality: {
          readability: 0,
          efficiency: 0,
          bestPractices: 0
        },
        correctSolution: "",
        solutionExplanation: ""
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return Response.json({
      isCorrect: false,
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      feedback: "Failed to evaluate submission. Please try again.",
      improvementSuggestions: [],
      codeQuality: {
        readability: 0,
        efficiency: 0,
        bestPractices: 0
      },
      correctSolution: "",
      solutionExplanation: ""
    }, { status: 200 }); // Return 200 instead of 500 to handle gracefully on frontend
  }
}
