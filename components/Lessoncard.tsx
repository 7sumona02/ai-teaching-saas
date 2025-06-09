import { TestTube } from 'lucide-react'
import React from 'react'

interface LessoncardProps {
  name: string
  topic: string
  color: string
}

const Lessoncard: React.FC<LessoncardProps> = ({
  name,
  topic,
  color
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg">
      <div className={`size-10 rounded-lg flex items-center justify-center`} style={{backgroundColor: color}}>
        <TestTube size={24} />
      </div>
      <div>
        <div className='text font-semibold'>{name}</div>
        <div className='text-sm font-medium text-gray-600'>Topic: {topic}</div>
      </div>
    </div>
  )
}

export default Lessoncard