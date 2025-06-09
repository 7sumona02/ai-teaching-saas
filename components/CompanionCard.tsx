'use client'
import { Bookmark, Clock } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import Link from 'next/link'

interface CompanionCardProps {
  id: number
  name: string
  subject: string
  topic: string
  duration: number // in seconds
  style?: string
  color: string
}

const CompanionCard: React.FC<CompanionCardProps> = ({
  id,
  name,
  subject,
  topic,
  duration,
  style,
  color
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  // Convert seconds to minutes for display
  const formatDuration = (seconds: number) => {
    const minutes = Math.ceil(seconds / 60)
    return `${minutes} min${minutes !== 1 ? 's' : ''}`
  }

  return (
    <div className={`border border-black rounded-lg p-4 space-y-3`} style={{ backgroundColor: color }}>
      <div className='flex justify-between items-center'>
        <Badge>{subject}</Badge>
        <button 
          className='rounded p-1 cursor-pointer bg-black transition-colors'
          onClick={toggleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? (
            <Bookmark size={12} className='text-white' fill='currentColor' />
          ) : (
            <Bookmark size={12} className='text-white' fill='none' />
          )}
        </button>
      </div>
      <div className='text-lg font-semibold'>{name}</div>
      <div className='text-sm font-medium'>Topic: {topic}</div>
      {style && <div className='text-sm font-medium'>Style: {style}</div>}
      <div className='flex items-center gap-1'>
        <Clock size={12} />
        <div className='text-xs font-medium'>{formatDuration(duration)}</div>
      </div>
      <Link href={`/companions/${id}`}>
        <Button className='w-full cursor-pointer'>
          Launch Lesson
        </Button>
      </Link>
    </div>
  )
}

export default CompanionCard