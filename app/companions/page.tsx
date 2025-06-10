import CompanionCard from '@/components/CompanionCard'
import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/SubjectFilter'
import { getAllCompanions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const CompanionsLibrary = async ({searchParams}: SearchParams) => {
    const filters = await searchParams
    const subject = filters.subject ? filters.subject : ''
    const topic = filters.topic ? filters.topic : ''

    const companions = await getAllCompanions({subject, topic})

    console.log(companions)
    
  return (
    <div className='container'>
      <div className='flex md:flex-row flex-col justify-between items-center space-y-4'>
        <h1 className='text-xl font-semibold pt-6'>Companions Library</h1>
        <div className='flex justify-end md:flex-row flex-col gap-4 w-full'>
            <SearchInput />
            <SubjectFilter />
        </div>
      </div>
      <div className='pt-6 grid md:grid-cols-3 grid-cols-1 gap-6'>
      {companions.map((companion) => (
                    <CompanionCard 
                        key={companion.id} 
                        id={companion.id}
                        name={companion.name}
                        subject={companion.subject}
                        topic={companion.topic}
                        duration={companion.duration}
                        style={companion.style}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
      </div>
    </div>
  )
}

export default CompanionsLibrary