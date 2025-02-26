"use client"

import { useState } from "react"
import { Send, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Code() {
  const [code, setCode] = useState("")
  const [currentProblem, setCurrentProblem] = useState({
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    startingCode: `function twoSum(nums, target) {
    // Write your code here
    
}`
  })

  const handleSubmit = () => {
    console.log("Submitted code:", code)
    // Here you would typically send the code to a backend for evaluation
  }

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
    </div>
  )
}
