"use client"

import { useState, useEffect } from "react"
import { Send, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Code() {
  const [code, setCode] = useState("")
  const [currentProblem, setCurrentProblem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    fetchNewProblem();
  }, []);

  const fetchNewProblem = async () => {
    try {
      const response = await fetch('/api/question');
      const problem = await response.json();
      setCurrentProblem(problem);
      setCode(problem.startingCode);
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, problem: currentProblem }),
      });
      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      console.error('Submission failed:', error);
    }
    setLoading(false);
  }

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col">
      {/* Problem Description */}
      <div className="border-b border-[#1A1B25] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              {currentProblem.title}
              <span className="ml-3 text-sm px-2 py-1 bg-green-600 rounded-full">
                {currentProblem.difficulty}
              </span>
            </h1>
          </div>
          <pre className="whitespace-pre-wrap text-gray-300 font-normal">
            {currentProblem.description}
          </pre>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1A1B25] rounded-xl overflow-hidden">
            {/* Code Editor Header */}
            <div className="bg-[#22233A] px-4 py-2 border-b border-[#2A2B3A] flex items-center justify-between">
              <div className="text-sm text-gray-400">JavaScript</div>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => setCode(currentProblem.startingCode)}
              >
                Reset Code
              </Button>
            </div>
            
            {/* Code Input */}
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              className="min-h-[400px] bg-[#1A1B25] border-0 rounded-none text-white font-mono text-sm p-4 resize-none focus:ring-0 focus:border-0"
              spellCheck="false"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-4">
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700" 
              onClick={handleSubmit}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Solution
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => console.log("Run code")}
            >
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </Button>
          </div>
        </div>
      </div>

      {/* Add feedback display */}
      {feedback && (
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-[#1A1B25] rounded-xl">
          <h3 className={`text-lg ${feedback.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {feedback.isCorrect ? 'Success!' : 'Not quite right'}
          </h3>
          <p className="text-gray-300 mt-2">{feedback.feedback}</p>
          <div className="mt-2 text-sm text-gray-400">
            <p>Time Complexity: {feedback.timeComplexity}</p>
            <p>Space Complexity: {feedback.spaceComplexity}</p>
          </div>
        </div>
      )}
    </div>
  )
}
