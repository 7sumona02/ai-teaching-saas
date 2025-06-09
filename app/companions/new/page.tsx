import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const NewCompanion = async () => {
    const { userId } = await auth()
    
    if (!userId) {
        redirect('/sign-in')
    }
        
    return (
        <div className="h-full p-4 max-w-3xl mx-auto">
            <CompanionForm />
        </div>
    )
}

export default NewCompanion