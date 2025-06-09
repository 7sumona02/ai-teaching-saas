import CompanionCard from '@/components/CompanionCard'
import CTA from '@/components/CTA'
import React from 'react'

const page = () => {
  return (
    <div className='container'>
      <h1 className='text-xl font-semibold pt-6'>Dashboard</h1>
      <div className='pt-6 grid md:grid-cols-3 grid-cols-1 gap-6'>
        <CompanionCard
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
        />
      </div>
      <div className='pb-10'>
        <CTA />
      </div>
    </div>
  )
}

export default page