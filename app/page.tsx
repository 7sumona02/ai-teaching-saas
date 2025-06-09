import CompanionCard from '@/components/CompanionCard'
import CTA from '@/components/CTA'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

interface Companion {
  id: number
  name: string
  subject: string
  topic: string
  duration: number
  style?: string
}

const page = () => {
  const companions: Companion[] = [
    {
      id: 1,
      name: "Math Genius",
      subject: "maths",
      topic: "Algebra Fundamentals",
      duration: 1800,
      style: "Interactive"
    },
    {
      id: 2,
      name: "Physics Genius",
      subject: "physics",
      topic: "Algebra Fundamentals",
      duration: 1800,
      style: "Interactive"
    },
    {
      id: 3,
      name: "Art Genius",
      subject: "art",
      topic: "Algebra Fundamentals",
      duration: 1800,
      style: "Interactive"
    },
    // ... other companions
  ]
  return (
    <div className='container'>
      <h1 className='text-xl font-semibold pt-6'>Dashboard</h1>
      <div className='pt-6 grid md:grid-cols-3 grid-cols-1 gap-6'>
        {/* <CompanionCard
          category="Science"
          title="Neura the Brainy Explorer"
          topic="Derivatives & Integrals"
          duration="30 mins"
        />
        <CompanionCard
          category="Science"
          title="Neura the Brainy Explorer"
          topic="Derivatives & Integrals"
          duration="30 mins"
          backgroundColor='bg-yellow-300'
        />
        <CompanionCard
          category="Science"
          title="Neura the Brainy Explorer"
          topic="Derivatives & Integrals"
          duration="30 mins"
          backgroundColor='bg-lime-300'
        /> */}
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
      <div className='pb-10'>
        <CTA />
      </div>
    </div>
  )
}

export default page