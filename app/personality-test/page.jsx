"use client"
import data from "../../hardData/questions.json"
import { useState, useEffect } from "react"
export default function PersonalityTestPage() {
    const [questionNo, setQuestionNo] = useState(0)
    const [answer, setAnswer] = useState()
    const [categoryScore, setCategoryScore] = useState([])
    const [diasbleprev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const length = data.questions.length
    const options = data.questions[questionNo].options
    console.log("selected option > "+answer)
    console.log("category score > "+categoryScore)
    

    const handleNext = () => {
        setDisablePrev(false)
        if(questionNo===length-2){
            setDisableNext(true)
            
        }
        setQuestionNo(questionNo+1)
        storeAnswer()
        
        
    }
    const storeAnswer = () => {
        let flag = false;
        const updatedScore = categoryScore.map((item, idx) => {
            if(idx===questionNo){
                
                flag = true;
                return parseInt(answer)
            }
            else{
                return item
            }
        } )

        if(!flag){
            setCategoryScore([...categoryScore, parseInt(answer)])
        }
        else{
            setCategoryScore(updatedScore)
        }
    }

    const handlePrevious = () => {
        setDisableNext(false)
        if(questionNo>0){
            setQuestionNo(questionNo-1);
            
        }
        else{
            setDisablePrev(true);
        }
    }

    const handleSubmit = () => {
        setIsSubmit(true)
        setCategoryScore([...categoryScore, parseInt(answer)])
    }
    
    return (
        <main className="h-screen bg-gradient-to-tl flex justify-center items-center from-rose-400 via-pink-200 to-white" >
            
            <div className=" flex justify-center items-center backdrop-blur-xl [ p-8 md:p-10 lg:p-10 ]
               
               [ border-[1px] border-solid border-white border-opacity-30 ]
               [ shadow-black/70 shadow-2xl ] w-auto  h-auto">
                <div className="flex flex-col justify-center items-centre" >
                    
                    {isSubmit?<div className="flex flex-col justify-center items-center" >
                        <h1 className=" text-4xl text-black font-bold mb-4" >Your personality Score is: </h1>
                        <h1 className=" text-4xl text-black font-bold mb-4" >{categoryScore}</h1>
                    </div>:
                    <div>
                    <h1 className=" text-4xl text-black font-bold mb-4" >{data.questions[questionNo].question}</h1>
                    <div className=" text-lg font-medium mb-4" >
                    <ul className="mt-6 space-y-3">
                        {
                            options.map((item, idx) => (
                                <li key={idx}>
                                    <label htmlFor={item.option} className="block relative">
                                        <input id={item.option} type="radio"  name="answer" className="sr-only peer" value={item.id} onChange={(event)=>{setAnswer(event.target.value)}} />
                                            <div className="w-full p-5 cursor-pointer rounded-lg border bg-white shadow-sm ring-pink-600 peer-checked:ring-2 duration-200 ">
                                                <div className="pl-7">
                                                    <h3 className="leading-none text-gray-800 font-medium">
                                                        {item.option}
                                                    </h3>
                                                    
                                                </div>
                                            </div>
                                        <span className="block absolute top-5 left-5 border peer-checked:border-[5px] peer-checked:border-pink-600 w-4 h-4 rounded-full">
                                        </span>
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                    <div className="flex justify-between items-center mt-4" >
                        <button className="bg-white text-black font-bold py-2 px-4 rounded-full" disabled={diasbleprev} onClick={handlePrevious} >Previous</button>
                        <button className="bg-white text-black font-bold py-2 px-4 rounded-full hover: bg-gradient-to-l from-pink-600 to-white" onClick={disableNext?handleSubmit:handleNext}>{!disableNext?"Next":"Submit"}</button>

                    </div>
                    </div>
                    }
                </div>
            </div>
        
        </main>
    )
}