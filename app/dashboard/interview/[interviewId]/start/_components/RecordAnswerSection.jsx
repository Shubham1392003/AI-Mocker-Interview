"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { getInterviewQA } from "@/utils/OpenAIModel";
import { db } from '@/utils/db'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { UserAnswer } from '@/utils/schema'
// import RecordAnswerSection from './_components/RecordAnswerSection';
import dynamic from 'next/dynamic';


function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {

    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    // const RecordAnswerSection = dynamic(
    //     () => import('./_components/RecordAnswerSection'),
    //     { ssr: false }
    // );

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result.transcript)
        ))
    }, [results]);


    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer])



    const StartStopRecording = async () => {
        if (isRecording) {

            stopSpeechToText();
            // if (userAnswer?.length < 10) {
            //     setLoading(false);
            //     toast('Error while saving your answer, Please record again')
            //     return;
            // }

        } else {
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);
        const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + ",User Answer:" + userAnswer + ",Depends on question and user answer for give interview question ,please give us rating for answer and feedback as arear of improvment if any ,in just 3 to 5 lines to to improve it in JSON format with rating field and feedback field";
        const result = await getInterviewQA(feedbackPrompt);
        const mockJsonResp = (result).replace('```json', '').replace('```')
        console.log(mockJsonResp)
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData?.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY')
        })

        if (resp) {
            toast('User Answer recorded successfully')
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);
        setLoading(false);

    }



    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-secondary rounded-lg p-5'>
                <Image src={'/webcaam.png'} width={200} height={200}
                    className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }} />
            </div>
            <Button
                disabled={loading}
                variant="outline" className="my-10"
                onClick={StartStopRecording}>
                {isRecording ?
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <StopCircle /> Stop Recording
                    </h2>
                    : 'Record Answer'}</Button>

            {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}


        </div>
    )
}

export default RecordAnswerSection