import React from 'react'

interface LessoncardProps {
  name: string
  topic: string
  color: string
  subject: string
}

const Lessoncard: React.FC<LessoncardProps> = ({
  name,
  topic,
  color,
  subject
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg">
      <div className={`p-2 rounded-lg flex items-center justify-center`} style={{backgroundColor: color}}>
        {/* <TestTube size={24} /> */}
        <img src={`/icons/${subject}.svg`} className='w-10' alt='subject-icon' />
      </div>
      <div>
        <div className='text font-semibold'>{name}</div>
        <div className='text-sm font-medium text-gray-600'>Topic: {topic}</div>
      </div>
    </div>
  )
}

export default Lessoncard