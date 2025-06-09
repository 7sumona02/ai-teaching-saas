import { TestTube } from 'lucide-react'
import React from 'react'

interface LessoncardProps {
  title: string
  topic: string
  backgroundColor?: string
}

const Lessoncard: React.FC<LessoncardProps> = ({
  title,
  topic,
  backgroundColor = 'bg-purple-200' // Default background color
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg">
      <div className={`${backgroundColor} size-10 rounded-lg flex items-center justify-center`}>
        <TestTube size={24} />
      </div>
      <div>
        <div className='text font-semibold'>{title}</div>
        <div className='text-sm font-medium text-gray-600'>Topic: {topic}</div>
      </div>
    </div>
  )
}

export default Lessoncard