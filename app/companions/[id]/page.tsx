

import CompanionComponent from '@/components/CompanionComponent'
import Lessoncard from '@/components/Lessoncard'
import { Badge } from '@/components/ui/badge'
import { getCompanion } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params
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