"use client"
import { db } from '@/utils/db';
import { MockInterView } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCerd from './InterviewCerd';

function InterviewList() {

    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList = async()=>{
        const result = await db.select().from(MockInterView).where(eq(MockInterView.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterView.id))

        console.log(result)
        setInterviewList(result);
    }

  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-2'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewCerd interview={interview} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList