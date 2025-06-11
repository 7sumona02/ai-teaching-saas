'use client'
import { cn, configureAssistant } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { Mic } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'

export enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

export interface CompanionComponentProps {
  companionId: string
  subject: string
  topic: string
  name: string
  userName: string
  userImage: string
  voice: string
  style: string
  color: string
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
  }

const CompanionComponent = ({
//   companionId, 
  subject, 
  topic, 
  name, 
  userName, 
//   userImage, 
  style, 
  voice,
  color
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  
  useEffect(() => {
    const onCallStart = () => { setCallStatus(CallStatus.ACTIVE) }
    const onCallEnd = () => { setCallStatus(CallStatus.FINISHED) }
    const onMessage = (message: { type: string; transcriptType: string; role: "user" | "system" | "assistant"; transcript: string }) => {
        if(message.type === 'transcript' && message.transcriptType === 'final'){
            const newMessage = { role: message.role, content: message.transcript}
            setMessages((prev) => [newMessage, ...prev])
        }
    }
    const onError = (error: Error) => console.log("Error", error)
    const onSpeechStart = () => { setIsSpeaking(true) }
    const onSpeechEnd = () => { setIsSpeaking(false) }

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('error', onError)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)  

    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('error', onError)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)  
    }
  }, [])

  console.log({subject})

  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if(lottieRef){
        if(isSpeaking) {
            lottieRef.current?.play()
        }
        else {
            lottieRef.current?.stop()
        }
    }
  },[isSpeaking,lottieRef])

  const [isMuted, setisMuted] = useState(false)
  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted()
    vapi.setMuted(!isMuted)
    setisMuted(!isMuted)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)
    
    const assistantOverrides = {
        variableValues: {
            subject, topic, style
        },
        clientMessages: ['transcript'],
        serverMessages: []
    }
    // @ts-expect-error - Vapi's start method expects different parameters than what we're passing
    vapi.start(configureAssistant(voice,style),assistantOverrides)
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }
  
  return (
   <div className='w-full flex md:flex-row flex-col gap-6'>
    <div className='relative md:w-2/3 border border-black h-[50vh] rounded-lg flex flex-col items-center justify-center mt-10 p-6'>
        <div className={cn('p-6 rounded-lg flex items-center justify-center', callStatus===CallStatus.FINISHED || CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus===CallStatus.CONNECTING && 'opacity-100 animate-pulse')} style={{backgroundColor: color}}>
            <img src={`/icons/${subject}.svg`} className='w-14' alt='subject-icon' />
        </div>
        <div className={cn('absolute top-4 right-4 transition-opacity duration-1000', callStatus===CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
            <Lottie
            lottieRef={lottieRef}
            animationData={soundwaves}
            autoPlay={false}
            className='w-16'
            />
        </div>
        <p className='text-xl font-semibold py-2'>{name}</p>
        <ScrollArea className='transcript w-full h-44'>
            {messages.map((message) => {
                if(message.role === 'assistant') {
                    return (
                        <p key={message.content} className='font-medium text-sm text-neutral-600'>
                            {name
                            .split(' ')[0]
                            .replace('/[.,]/g, ','')
                            } : {message.content}
                        </p>
                    )
                } else {
                    <p key={message.content}>
                        {userName}: {message.content}
                    </p>
                }
            })}
        </ScrollArea>
        <div className='transcript-fade'>messages</div>
    </div>
    <div className='md:w-1/3'>
        <div className='border border-black p-6 py-10 rounded-lg md:mt-10 mt-6 flex flex-col justify-center items-center'>
            <Avatar className='size-20'>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-xl font-semibold pt-6'>{userName}</p>
        </div>
        <div className='flex gap-4 w-full'>
            <div className='w-1/2 border border-black p-4 flex flex-col items-center justify-center mt-6 rounded-lg gap-2'>
                <Button variant={"ghost"} onClick={toggleMicrophone}>
                    <Mic />
                </Button>
                <p>{isMuted ? 'Turn on' : 'Turn off'}</p>
            </div>
           <div className='w-1/2 border border-black p-4 flex flex-col items-center justify-center mt-6 rounded-lg'>
                <Button variant={"ghost"} className={cn('', callStatus === CallStatus.ACTIVE ? 'bg-red-100' : 'bg-transparent', callStatus===CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus===CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                    {callStatus===CallStatus.ACTIVE ? 'End Session' : callStatus===CallStatus.CONNECTING ? 'Connecting' : 'Start Session'}
                </Button>
           </div>
        </div>
    </div>
   </div>
  )
}

export default CompanionComponent