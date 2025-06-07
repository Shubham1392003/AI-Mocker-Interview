"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getInterviewQA } from "@/utils/OpenAIModel";
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterView } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false)
  const [jobPosition, setJobPostion] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExprience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const route = useRouter();


  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    // this is grtting Q&A from Openrouter with the help ok API
    const prompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers.

Return ONLY a JSON array where each item has "question" and "answer" fields. Do NOT include any text or object wrapper—only the raw JSON array.

Example format:
[
  { "question": "What is X?", "answer": "X is..." },
  { "question": "Explain Y.", "answer": "Y is..." }
]`


    const rawText = await getInterviewQA(prompt);
    const MockJsonResp = (rawText).replace('```json', '').replace('```')
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);



    // we are inserting infor in database 
    if (MockJsonResp) {
      const resp = await db.insert(MockInterView).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({ mockId: MockInterView.mockId })
      console.log("Inserted ID ", resp)

      if (resp) {
        setOpenDailog(false);
        route.push('/dashboard/interview/' + resp[0]?.mockId)
      }


    } else { console.log("error") }

    setLoading(false)

  };


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDailog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDailog}>

        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your Jod Interview</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add Details about your job position , job description, year os experience</h2>

                  <div className='mt-7 my-3'>
                    <label>Job Role/Job Position </label>
                    <Input placeholder="Ex. Frontend Developer." required onChange={(event) => setJobPostion(event.target.value)} />
                  </div>

                  <div className='my-3'>
                    <label>Job Description/ Tech Stack (In short)</label>
                    <Textarea placeholder="Ex. React,Angular, Machine Learning, Etc." required onChange={(event) => setJobDesc(event.target.value)} />
                  </div>

                  <div className='my-3'>
                    <label>Job Experience </label>
                    <Input placeholder="Ex. 5 " type="number" max="70" required onChange={(event) => setJobExprience(event.target.value)} />
                  </div>

                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />'Generating from AI'  </> :
                      'Start interview'

                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview