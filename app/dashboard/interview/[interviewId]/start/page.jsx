"use client"
import { db } from '@/utils/db';
import { MockInterView } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const unwrappedParams = use(params); 

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetail();
    }, []);

    // Used to gtt Inetrview Details by Mckid/Interview Id
    const GetInterviewDetail = async () => {
        const result = await db.select().from(MockInterView).where(eq(MockInterView.mockId, unwrappedParams.interviewId))

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setmockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Question */}
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex} />

                {/* Video / Audio Recording  */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData} />

            </div>

            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} >Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex == mockInterviewQuestion?.length - 1 && <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}><Button>End Interview</Button></Link>}
            </div>

        </div>
    )
}

export default StartInterview