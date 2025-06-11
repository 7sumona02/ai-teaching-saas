// 'use client'
// import Lessoncard from '@/components/Lessoncard'
// import { Badge } from '@/components/ui/badge'
// import { getCompanion } from '@/lib/actions/companion.actions'
// import { getSubjectColor } from '@/lib/utils'
// import { vapi } from '@/lib/vapi.sdk'
// import { currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'
// import React, { useEffect, useState } from 'react'

// interface CompanionSessionPageProps {
//     params: Promise<{id: string}>
// }

// const CompanionSession = async ({params}: CompanionSessionPageProps) => {
//     const {id} = await params
//     const companion = await getCompanion(id)
//     const user = await currentUser()

//     if (!user) {
//         redirect('/sign-in')
//     }
//     if (!companion?.name) {
//         redirect('/companions')
//     }

//     return (
//         // <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//         //     <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
//         //         <div className="bg-blue-600 p-6 text-white">
//         //             <h1 className="text-2xl font-bold">{companion.name}</h1>
//         //             <p className="text-blue-100">{companion.title}</p>
//         //         </div>
                
//         //         <div className="p-6">
//         //             <div className="mb-4">
//         //                 <h2 className="text-lg font-semibold text-gray-700">Subject</h2>
//         //                 <p className="text-gray-600">{companion.subject}</p>
//         //             </div>
                    
//         //             <div className="mb-4">
//         //                 <h2 className="text-lg font-semibold text-gray-700">Topic</h2>
//         //                 <p className="text-gray-600">{companion.topic}</p>
//         //             </div>
                    
//         //             <div className="mb-4">
//         //                 <h2 className="text-lg font-semibold text-gray-700">Session Duration</h2>
//         //                 <p className="text-gray-600">{companion.duration} minutes</p>
//         //             </div>
                    
//         //             <div className="mt-6 pt-4 border-t border-gray-200">
//         //                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
//         //                     Start Session
//         //                 </button>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//         <div className='container md:mt-10'>
//             <div className='border border-black p-6 rounded-lg flex md:flex-row flex-col space-y-2 justify-between'>
//                 <div className='flex items-start gap-2'>
//                     <div>
//                     <Lessoncard 
//                         name={companion.name}
//                         topic={companion.topic}
//                         color={getSubjectColor(companion.subject)}
//                         subject={companion.subject}
//                     />
//                     </div>
//                     <div>
//                         <Badge>{companion.subject}</Badge>
//                     </div>
//                 </div>
//                 <div>45 mins</div>
//             </div>
//             <CompanionComponent />
//         </div>
//     )
// }

// interface CompanionComponentProps {
//     companionId: string;
//     subject: string;
//     topic: string;
//     name: string;
//     userName: string;
//     userImage: string;
//     voice: string;
//     style: string;
//   }
  
//   enum CallStatus {
//     INACTIVE = 'INACTIVE',
//     CONNECTING = 'CONNECTING',  // Fixed typo (extra N)
//     ACTIVE = 'ACTIVE',
//     FINISHED = 'FINISHED'
//   }
  
//   const CompanionComponent = ({
//     companionId, 
//     subject, 
//     topic, 
//     name, 
//     userName, 
//     userImage, 
//     style, 
//     voice
//   }: CompanionComponentProps) => {
//     const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//     const [isSpeaking, setIsSpeaking] = useState(false)
    
//     useEffect(() => {
//         const onCallStart = () => {setCallStatus(CallStatus.ACTIVE)}

//         const onCallEnd = () => {setCallStatus(CallStatus.FINISHED)}

//         const onMessage = {}

//         const onError = (error: Error) => console.log("Error", error)

//         const onSpeechStart = () => {setIsSpeaking(true)}
//         const onSpeechEnd = () => {setIsSpeaking(false)}

//         vapi.on('call-start', onCallStart)
//         vapi.on('call-end', onCallStart)
//         vapi.on('message', onCallStart)
//         vapi.on('error', onCallStart)
//         vapi.on('speech-start', onSpeechStart)
//         vapi.on('speech-end', onSpeechEnd)  

//         return () => {
//             vapi.off('call-start', onCallStart)
//             vapi.off('call-end', onCallStart)
//             vapi.off('message', onCallStart)
//             vapi.off('error', onCallStart)
//             vapi.off('speech-start', onSpeechStart)
//             vapi.off('speech-end', onSpeechEnd)  
//         }
//     },[])

//     return (
//       <div>{name}</div>
//     );
//   };
  
// export default CompanionSession

import CompanionComponent from '@/components/CompanionComponent'
import Lessoncard from '@/components/Lessoncard'
import { Badge } from '@/components/ui/badge'
import { getCompanion } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface CompanionSessionPageProps {
  params: { id: string }
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = params
  const companion = await getCompanion(id)
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }
  if (!companion?.name) {
    redirect('/companions')
  }

  return (
    <div className='container md:mt-10'>
      <div className='border border-black p-6 rounded-lg flex md:flex-row flex-col space-y-2 justify-between'>
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
      <CompanionComponent 
        companionId={companion.id}
        subject={companion.subject}
        topic={companion.topic}
        name={companion.name}
        userName={user.username || ''}
        userImage={user.imageUrl}
        voice={companion.voice}
        style={companion.style}
        color={getSubjectColor(companion.subject)}
      />
    </div>
  )
}

export default CompanionSession