import { Code2, Binary } from "lucide-react"

const LoadingSpinner = ({ type = 'initial' }) => {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center animate-pulse">
        <Code2 className="w-12 h-12 text-purple-500 animate-spin" />
        <span className="mt-2 text-sm text-gray-400">Loading problem...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <Binary className="w-5 h-5 text-white animate-spin" />
    </div>
  )
}

export default LoadingSpinner
