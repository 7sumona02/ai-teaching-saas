'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

const SearchInput = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    // const query = searchParams.get('topic') || '';
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
         if(searchQuery) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "topic",
                value: searchQuery,
            });

            router.push(newUrl, { scroll: false });
        } else {
            if(pathname === '/companions') {
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                });

                router.push(newUrl, { scroll: false });
            }
        }   
        },500)
        
        return () => clearTimeout(delayDebounceFn) // Cleanup the timeout
    },[searchQuery,router,pathname,searchParams])

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input className="peer ps-9 border border-black" placeholder="Search companions..." type="email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Search size={16} className='text-black' aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export default SearchInput