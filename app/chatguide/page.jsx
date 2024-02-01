"use client"
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'
import { checkUser } from '@/utils/auth';
import Swal from 'sweetalert2'
import { ScaleLoader } from 'react-spinners';
const Question = ({ question, index, onSelect, isCurrent, isCompleted }) => {
  
    const options = Array(5).fill(null); // Create an array with 5 null elements
    return (
      <Transition
        show={isCurrent}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        
        <div
          className={`flex flex-col items-center justify-center text-center p-4 space-y-4 ${
            isCompleted ? 'opacity-50' : 'opacity-100'
          } transition-opacity w-full`}
        >
          <p className="text-lg sm:text-xl md:text-3xl  mb-2 sm:mb-3 md:mb-4 text-black font-quicksand font-medium">{` ${question}`}</p>
          <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold pr-2 text-black font-quicksand">Disagree</span>
            {options.map((_, idx) => (
          <button
            key={idx}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
              isCompleted ? 'bg-gray-300' : 'bg-color2 hover:bg-color2'
            } focus:outline-none border-[5px] focus:border-color1 focus:ring-1 focus:ring-color2 focus:ring-opacity-50 focus-visible:to-blue-500 transition duration-300 ease-in-out`}
            onClick={() => onSelect(index, idx + 1)}
            aria-label={`Option ${idx + 1}`}
            disabled={isCompleted}
          />
        ))}
            <span className="text-lg sm:text-xl md:text-2xl font-semibold pl-2 text-black font-quicksand">Agree</span>
          </div>
        </div>
      </Transition>
    );
  };
  

const Questionnaire = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([""]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [percent, setPercent] = useState(0);
  const [user, setUser] = useState(); 
  const [loader,setLoader] = useState(true);
  const getUser = async()=>{
    const user =  await checkUser();
    setUser(user);
  }
  useEffect(()=>{
    getUser();
  },[])
  console.log(user?user.email:"i dont know");

  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        setLoader(true);
        const res = await fetch("api/questions");
        const data = await res.json();
        console.log(data.questionsList);
        setQuestions(data.questionsList);
        setLoader(false);
      }catch(error){
        setLoader(false);
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  //handel option select
  const handleSelect = (index, option) => {
    console.log("question no.",index,option)
    let updateScore  = answers;
    updateScore[index] = option;
    setAnswers(updateScore);
    setPercent(((index + 1)*100/questions.length).toFixed(2));
    // Move to next question after a delay
    if(index+1<questions.length){
      setTimeout(() => {
        setCurrentQuestionIndex(index + 1);
      }, 300); // Delay of 300ms
    }
    
    console.log(answers)
  };

  //to handel previous button
  const handelPrev = ()=>{
    if(currentQuestionIndex > 0){
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setPercent(((currentQuestionIndex -1 )*100/questions.length).toFixed(2))
    }
  }
  
  // handel submit button
  const handelSubmit = async () => {
    setLoader(true);
    console.log(answers);
    // Call post api for result submission at personality endpoint
    const res = await fetch("api/personality", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        answers: answers,
        categoryscore: answers
      })
    });

    const data = await res.json(); // Get the response data
    setLoader(false);
    if(data.status ===200){
      Swal.fire({
      title: "Test Submitted",
      text: "Test submitted successfully",
      icon: "success",
      timerProgressBar: true,
      timer: 2000
      })
      setTimeout(()=>{
        router.push("/result");
      },2000)
    }
    else if(data.status ===201){
      Swal.fire({
        title: "Already Submitted",
        text: "Test already submitted",
        icon: "info",
        timerProgressBar: true,
        timer: 2000,
      });
      setTimeout(()=>{
        router.push("/result");
      },2000)
    }
    else{
      Swal.fire({
      title: "Error",
      text: data.message,
      icon: "error",
      timerProgressBar: true,
      timer: 3000
    })
    }
    
  }

  return (
    <div>
        {loader?<div className='flex flex-col h-screen w-full items-center justify-evenly bg-gray-50'><ScaleLoader color="#B67DFD" loading = {loader} /></div>:
        <div className="flex flex-col h-screen w-full items-center justify-evenly bg-gray-50">
          <div className="pb-4 w-3/5">
            <span id="ProgressLabel" className="sr-only">Loading</span>

            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              aria-valuenow={percent}
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-4 rounded-full bg-gradient-80 from-color1 via-color2 to-color3 text-center text-[10px]/4 transition-all duration-400 ease-linear"
                style={{width: `${percent}%`}}
              >
                <span className="font-bold text-white"> {percent}% </span>
              </span>
            </span>
          </div>
        <div>
          {questions.map((q, index) => (
          <div key={index} className="w-full px-4 sm:px-6 lg:px-8">
            <Question
              question={q}
              index={index}
              onSelect={handleSelect}
              isCurrent={currentQuestionIndex === index}
              isCompleted={index < currentQuestionIndex}
            />
          </div>
        ))}
        </div>
        
        <div className="flex justify-between w-full px-4 sm:px-6 lg:px-8">
          <button
            className="p-2 rounded-md bg-gradient-80 from-color1 via-color2 to-color3 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handelPrev}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          {(currentQuestionIndex === questions.length - 1)?
            <button
            className="p-2 rounded-md bg-gradient-80 from-color1 via-color2 to-color3 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={handelSubmit}
            disabled={currentQuestionIndex !== questions.length - 1}
          >
            Submit
          </button> 
          :
          <div></div>
          // <button
          //   className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          //   onClick={handelNext}
          //   disabled={currentQuestionIndex === questions.length - 1}
          // >
          //   <ChevronRightIcon className="w-5 h-5" />
          // </button>
          }
          
        </div>
        <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
          
          </div>
      </div>
      }
    
    </div>
    
  );
};

export default Questionnaire;
