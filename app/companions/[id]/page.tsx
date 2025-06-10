import Lessoncard from '@/components/Lessoncard'
import { Badge } from '@/components/ui/badge'
import { getCompanion } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

interface CompanionSessionPageProps {
    params: Promise<{id: string}>
}

const CompanionSession = async ({params}: CompanionSessionPageProps) => {
    const {id} = await params
    const companion = await getCompanion(id)
    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }
    if (!companion?.name) {
        redirect('/companions')
    }

    return (
        // <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        //     <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        //         <div className="bg-blue-600 p-6 text-white">
        //             <h1 className="text-2xl font-bold">{companion.name}</h1>
        //             <p className="text-blue-100">{companion.title}</p>
        //         </div>
                
        //         <div className="p-6">
        //             <div className="mb-4">
        //                 <h2 className="text-lg font-semibold text-gray-700">Subject</h2>
        //                 <p className="text-gray-600">{companion.subject}</p>
        //             </div>
                    
        //             <div className="mb-4">
        //                 <h2 className="text-lg font-semibold text-gray-700">Topic</h2>
        //                 <p className="text-gray-600">{companion.topic}</p>
        //             </div>
                    
        //             <div className="mb-4">
        //                 <h2 className="text-lg font-semibold text-gray-700">Session Duration</h2>
        //                 <p className="text-gray-600">{companion.duration} minutes</p>
        //             </div>
                    
        //             <div className="mt-6 pt-4 border-t border-gray-200">
        //                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
        //                     Start Session
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='container mt-10'>
            <div className='border border-black p-6 rounded-lg flex justify-between'>
                <div className='flex items-start gap-2'>
                    <div>
                    <Lessoncard 
                        name={companion.name}
                        topic={companion.topic}
                        color={getSubjectColor(companion.subject)}
                        subject={companion.subject}
                    />
                    </div>
                    <div>
                        <Badge>{companion.subject}</Badge>
                    </div>
                </div>
                <div>45 mins</div>
            </div>
        </div>
    )
}

export default CompanionSession