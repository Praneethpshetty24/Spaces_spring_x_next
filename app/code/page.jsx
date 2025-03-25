"use client"

import { useState, useEffect } from "react"
import { Send, CheckCircle, XCircle, Code, Clock, HardDrive, Lightbulb, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import LoadingSpinner from "./components/LoadingSpinner"
import RouteProtector from "../RouteProtector/page"

export default function CodeChallenge() {
  const [code, setCode] = useState("")
  const [currentProblem, setCurrentProblem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    fetchNewProblem()
  }, [])

  const fetchNewProblem = async () => {
    try {
      const response = await fetch("/api/question")
      const problem = await response.json()
      setCurrentProblem(problem)
      setCode(problem.startingCode)
    } catch (error) {
      console.error("Failed to fetch problem:", error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setShowSolution(false)
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, problem: currentProblem }),
      })
      const result = await response.json()
      setFeedback(result)
    } catch (error) {
      console.error("Submission failed:", error)
    }
    setLoading(false)
  }

  // Function to render code quality meter
  const renderQualityMeter = (value) => {
    const percentage = (value / 10) * 100
    return (
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
        <div 
          className={`h-2.5 rounded-full ${
            percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
          }`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )
  }

  if (!currentProblem)
    return (
      <div className="min-h-screen bg-[#0B0C14] flex items-center justify-center">
        <LoadingSpinner type="initial" />
      </div>
    )

  return (
    <RouteProtector>
      <div className="min-h-screen bg-[#0B0C14] text-white flex flex-col">
        {/* Problem Description - Full Width */}
        <div className="border-b border-[#1A1B25] p-4 md:p-6">
          <div className="w-full max-w-[1440px] mx-auto px-2">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl md:text-2xl font-bold">{currentProblem.title}</h1>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300 font-normal text-sm md:text-base">{currentProblem.description}</pre>
          </div>
        </div>

        {/* Code Editor and Feedback Area - Equal Width */}
        <div className="flex-1 p-2 md:p-4">
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
            {/* Left side: Code Editor */}
            <div className="w-full">
              <div className="bg-[#1A1B25] rounded-lg overflow-hidden h-full flex flex-col">
                {/* Code Editor Header */}
                <div className="bg-[#22233A] px-3 py-2 border-b border-[#2A2B3A] flex items-center justify-between">
                  <div className="text-sm text-gray-400">Solution Editor</div>
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
                  className="flex-1 min-h-[400px] bg-[#1A1B25] border-0 rounded-none text-white font-mono text-sm p-3 resize-none focus:ring-0 focus:border-0"
                  spellCheck="false"
                />

              {/* Action Buttons */}
                <div className="p-3 border-t border-[#2A2B3A]">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <LoadingSpinner type="submission" />
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Solution
                    </>
                  )}
                </Button>
                </div>
              </div>
            </div>

            {/* Right side: Feedback */}
            <div className="w-full">
              {feedback ? (
                <div className="bg-[#1A1B25] rounded-lg overflow-hidden h-full flex flex-col">
                  {/* Feedback Header */}
                  <div className={`px-3 py-2 flex items-center ${feedback.isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                    {feedback.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <h3 className="text-base md:text-lg font-medium">
                  {feedback.isCorrect ? "Success!" : "Not quite right"}
                </h3>
                  </div>
                  
                  {/* Feedback Content */}
                  <div className="p-3 space-y-3 overflow-y-auto flex-1">
                    {/* Main Feedback */}
                    <div>
                      <h4 className="text-xs uppercase text-gray-400 mb-1">FEEDBACK</h4>
                      <p className="text-gray-200 text-sm">{feedback.feedback}</p>
                    </div>
                    
                    {/* Complexity Analysis */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Time Complexity</span>
                        </div>
                        <p className="text-gray-200 font-mono text-sm">{feedback.timeComplexity}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-xs text-gray-400">
                          <HardDrive className="h-3 w-3 mr-1" />
                          <span>Space Complexity</span>
                        </div>
                        <p className="text-gray-200 font-mono text-sm">{feedback.spaceComplexity}</p>
                      </div>
                    </div>
                    
                    {/* Code Quality */}
                    {feedback.codeQuality && (
                      <div>
                        <h4 className="text-xs uppercase text-gray-400 mb-2">CODE QUALITY</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-300">Readability</span>
                              <span className="text-xs text-gray-300">{feedback.codeQuality.readability}/10</span>
                            </div>
                            {renderQualityMeter(feedback.codeQuality.readability)}
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-300">Efficiency</span>
                              <span className="text-xs text-gray-300">{feedback.codeQuality.efficiency}/10</span>
                            </div>
                            {renderQualityMeter(feedback.codeQuality.efficiency)}
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-300">Best Practices</span>
                              <span className="text-xs text-gray-300">{feedback.codeQuality.bestPractices}/10</span>
                            </div>
                            {renderQualityMeter(feedback.codeQuality.bestPractices)}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Improvement Suggestions */}
                    {feedback.improvementSuggestions && feedback.improvementSuggestions.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase text-gray-400 mb-2 flex items-center">
                          <Lightbulb className="h-3 w-3 mr-1 text-yellow-500" />
                          <span>IMPROVEMENT SUGGESTIONS</span>
                        </h4>
                        <ul className="list-disc pl-4 space-y-1">
                          {feedback.improvementSuggestions.map((suggestion, index) => (
                            <li key={index} className="text-gray-300 text-xs">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Correct Solution */}
                    {feedback.correctSolution && (
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs uppercase text-gray-400 flex items-center">
                            <Code className="h-3 w-3 mr-1 text-blue-500" />
                            <span>CORRECT SOLUTION</span>
                          </h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-gray-400 hover:text-white py-0 h-6"
                            onClick={() => setShowSolution(!showSolution)}
                          >
                            {showSolution ? "Hide" : "Show"}
                          </Button>
                        </div>
                        {showSolution && (
                          <pre className="bg-[#22233A] p-2 rounded-md text-xs text-gray-200 font-mono mt-2 overflow-x-auto">
                            {feedback.correctSolution}
                          </pre>
                        )}
                      </div>
                    )}
                    
                    {/* Solution Explanation */}
                    {feedback.solutionExplanation && (
                      <div>
                        <h4 className="text-xs uppercase text-gray-400 mb-2 flex items-center">
                          <BookOpen className="h-3 w-3 mr-1 text-blue-400" />
                          <span>EXPLANATION</span>
                        </h4>
                        <div className="text-gray-200 text-xs bg-[#22233A] p-2 rounded-md">
                          {feedback.solutionExplanation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-[#1A1B25] rounded-lg h-full flex items-center justify-center p-4 text-center">
                  <div className="text-gray-400">
                    <Code className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p className="text-base md:text-lg">Submit your solution to see feedback</p>
                    <p className="text-xs md:text-sm mt-2 max-w-md mx-auto">
                      Your code will be evaluated for correctness, time and space complexity, 
                      and code quality metrics.
                    </p>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </RouteProtector>
  )
}

