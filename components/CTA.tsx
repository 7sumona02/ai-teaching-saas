import React from 'react'
import Lessoncard from './Lessoncard'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Link from 'next/link'
import { getSubjectColor } from '@/lib/utils'

const CTA = () => {
  // Sample data for recently completed lessons
  const recentLessons = [
    {
      id: 1,
      name: "Chemistry Basics",
      topic: "Atomic Structure",
      subject: "physics",
      duration: "45 mins"
    },
    {
      id: 2,
      name: "Algebra Fundamentals",
      topic: "Solving Linear Equations",
      subject: "math",
      duration: "45 mins"
    },
    {
      id: 3,
      name: "Programming Concepts",
      topic: "Data Structures",
      subject: "art",
      duration: "45 mins"
    },
    {
      id: 4,
      name: "English Literature",
      topic: "Shakespeare's Sonnets",
      subject: "history",
      duration: "45 mins"
    },
    {
      id: 5,
      name: "World History",
      topic: "Ancient Civilizations",
      subject: "english",
      duration: "45 mins"
    },
    {
        id: 6,
        name: "Subject 1",
        topic: "Ancient Civilizations",
        subject: "music",
        duration: "45 mins"
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-8'>
        <div className='md:col-span-2 col-span-1'>
            <div className='border border-black rounded-lg p-4'>
                <div className='title font-semibold mb-4'>Recently completed lessons</div>
                <div className='overflow-x-auto'>
                    <div className='min-w-[600px]'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Lessons</TableHead>
                                    <TableHead className='w-[150px]'>Subject</TableHead>
                                    <TableHead className='w-[100px]'>Duration</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentLessons.map((lesson) => (
                                    <TableRow key={lesson.id}>
                                        <TableCell>
                                            <Lessoncard 
                                                name={lesson.name}
                                                topic={lesson.topic}
                                                color={getSubjectColor(lesson.subject)}
                                                subject={lesson.subject}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Badge 
                                            >
                                                {lesson.subject}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{lesson.duration}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <div className='cols-span-1 bg-[#2C2C2C] rounded-lg p-6 h-fit'>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-center gap-2'>
                    <Badge className='bg-amber-300 text-black'>Start learning your way.</Badge>
                    <h1 className='text-lg font-semibold text-white'>Build a Personalize Learning Companion</h1>
                    <p className='text-sm font-medium text-neutral-100'>
                        Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
                    </p>
                </div>
                <div>
                    <img
                        src='/assets/ctaimg.svg'
                        className='w-60'
                        alt="Learning companion illustration"
                    />
                </div>
                <Link href='companions/new'>
                    <Button className='bg-orange-300 hover:bg-orange-400 text-black w-full px-18'>
                        Build New Companion
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CTA