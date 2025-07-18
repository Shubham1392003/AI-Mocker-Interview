"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterView } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState();

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetail();
    }, [])

    // Used to gtt Inetrview Details by Mckid/Interview Id
    const GetInterviewDetail = async () => {
        const result = await db.select().from(MockInterView).where(eq(MockInterView.mockId, params.interviewId))

        setInterviewData(result[0]);
    }


    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'> Let's Get Started</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              
                {interviewData ? (
                    <div className='flex flex-col my-5 gap-5'>
                        <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2 className='text-lg'><strong>Job Role / Job position:</strong> {interviewData.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description / Tech Stack:</strong> {interviewData.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experince:</strong> {interviewData.jobExperience}</h2>
                        </div>
                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-700'><Lightbulb/><strong>Information</strong></h2>
                            <h2 className='mt-3 text-yellow-700'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        </div>
                    </div>
                ) : (
                    <p>Loading interview data...</p>
                )}

                  <div>
                    {webCamEnabled ? <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300,
                        }} /> :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-28 bg-secondary round-lg border' />
                            <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
                        </>
                    }
                </div>


            </div>
            
            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}> <Button>Start Interview</Button></Link>
               
                </div>

        </div>
    )


}

export default Interview