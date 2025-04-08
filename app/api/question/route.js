import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = "Generate a coding question with the following format:\n" +
      "Question: [A clear, concise programming question]\n" +
      "Example:\n" +
      "Input: [example input]\n" +
      "Output: [example output]\n" +
      "Make it simple and straightforward, similar to a basic programming exercise.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response into structured data
    const lines = text.split('\n');
    let problem = {
      id: Date.now(),
      question: '',
      example: ''
    };

    // Basic parsing of the AI response
    let section = '';
    for (const line of lines) {
      if (line.toLowerCase().includes('question:')) {
        section = 'question';
        problem.question = line.replace(/question:\s*/i, '').trim();
      } else if (line.toLowerCase().includes('example:')) {
        section = 'example';
      } else if (section === 'example') {
        problem.example += line + '\n';
      }
    }

    return Response.json(problem);
  } catch (error) {
    return Response.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
