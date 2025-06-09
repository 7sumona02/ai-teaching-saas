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

const CTA = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-8'>
        <div className='md:col-span-2 col-span-1'>
            <div className='border border-black rounded-lg p-4'>
                <div className='title font-semibold mb-4'>Recently completed lessons</div>
                <div className='overflow-x-auto'>
                    <div className='min-w-[600px]'> {/* Minimum width to prevent squeezing */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Lessons</TableHead>
                                    <TableHead className='w-[150px]'>Subject</TableHead>
                                    <TableHead className='w-[100px]'>Duration</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Chemistry Basics" 
                                            topic="Atomic Structure" 
                                            backgroundColor="bg-purple-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Science</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Algebrina, the Eq Queen" 
                                            topic="Solving Linear Equations" 
                                            backgroundColor="bg-yellow-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Maths</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Algebrina, the Eq Queen" 
                                            topic="Solving Linear Equations" 
                                            backgroundColor="bg-yellow-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Maths</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Algebrina, the Eq Queen" 
                                            topic="Solving Linear Equations" 
                                            backgroundColor="bg-yellow-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Maths</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Algebrina, the Eq Queen" 
                                            topic="Solving Linear Equations" 
                                            backgroundColor="bg-yellow-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Maths</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Chemistry Basics" 
                                            topic="Atomic Structure" 
                                            backgroundColor="bg-lime-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Coding</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Lessoncard 
                                            title="Chemistry Basics" 
                                            topic="Atomic Structure" 
                                            backgroundColor="bg-red-200" 
                                        />
                                    </TableCell>
                                    <TableCell><Badge>Language</Badge></TableCell>
                                    <TableCell>45 mins</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <div className='cols-span-1 bg-[#2C2C2C] rounded-lg p-6 h-fit '>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-center gap-2'>
                    <Badge className='bg-amber-300 text-black'>Start learning your way.</Badge>
                    <h1 className='text-lg font-semibold text-white'>Build a Personalize Learning Companion</h1>
                    <p className='text-sm font-medium text-neutral-100'>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
                </div>
                <div>
                    <img
                    src='/assets/ctaimg.svg'
                    className='w-60' />
                </div>
                <div><Button className='bg-orange-300 text-black w-full px-18'>Build New Companion</Button></div>
            </div>
        </div>
    </div>
  )
}

export default CTA