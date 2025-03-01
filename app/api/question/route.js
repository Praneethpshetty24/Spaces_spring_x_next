import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = "Generate a coding problem with the following format:\n" +
      "- Title\n- Difficulty (Easy/Medium/Hard)\n" +
      "- Description with example input/output\n" +
      "- Starting code template in JavaScript\n" +
      "- Tell them where they can improve\n" +
      "Make it similar to LeetCode style problems.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI response into structured data
    const lines = text.split('\n');
    let problem = {
      id: Date.now(),
      title: lines[0].replace('Title: ', ''),
      difficulty: 'Medium',
      description: '',
      startingCode: ''
    };

    // Basic parsing of the AI response
    let section = '';
    for (const line of lines) {
      if (line.includes('Description:')) section = 'description';
      else if (line.includes('Starting code:')) section = 'code';
      else if (section === 'description') problem.description += line + '\n';
      else if (section === 'code') problem.startingCode += line + '\n';
    }

    return Response.json(problem);
  } catch (error) {
    return Response.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
