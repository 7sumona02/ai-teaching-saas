'use client'
import { Bookmark, Clock } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface CompanionCardProps {
  category: string
  title: string
  topic: string
  duration: string
  backgroundColor?: string
}

const CompanionCard: React.FC<CompanionCardProps> = ({
  category,
  title,
  topic,
  duration,
  backgroundColor = 'bg-purple-100',
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className={`border border-black rounded-lg p-4 ${backgroundColor} space-y-3`}>
      <div className='flex justify-between items-center'>
        <Badge>{category}</Badge>
        <button 
          className='rounded p-1 cursor-pointer bg-black transition-colors'
          onClick={toggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? (
            // Filled bookmark icon
            <Bookmark size={12} className='text-white' fill='currentColor' />
          ) : (
            // Outline bookmark icon
            <Bookmark size={12} className='text-white' fill='none' />
          )}
        </button>
      </div>
      <div className='text-lg font-semibold'>{title}</div>
      <div className='text-sm font-medium'>Topic: {topic}</div>
      <div className='flex items-center gap-1'>
        <Clock size={12} />
        <div className='text-xs font-medium'>{duration} duration</div>
      </div>
      <div>
        <Button className='w-full cursor-pointer'>
          Launch Lesson
        </Button>
      </div>
    </div>
  )
}

export default CompanionCard