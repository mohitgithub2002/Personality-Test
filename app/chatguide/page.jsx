"use client"
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

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
          className={`flex flex-col items-center justify-center text-center p-4 sm:p-6 sm:m-6 md:p-8 md: m-8  h-3/4 ${
            isCompleted ? 'opacity-50' : 'opacity-100'
          } transition-opacity`}
        >
          <p className="text-lg sm:text-2xl md:text-4xl font-semibold mb-3 sm:mb-4 md:mb-6 text-start">{question}</p>
          <div className="flex items-center h-28 space-x-1 sm:space-x-2 md:space-x-4 ">
            <span className="text-lg sm:text-xl md:text-2xl font-medium pr-2">Disagree</span>
            {options.map((_, idx) => (
              <button
                key={idx}
                className={`block w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ${
                  isCompleted ? 'bg-gray-300' : 'bg-blue-100 hover:bg-blue-200'
                } focus:outline-none focus:ring focus:ring-blue-500 focus-visible:to-blue-500 transition duration-300 ease-in-out`}
                onClick={() => onSelect(index, idx + 1)}
                disabled={isCompleted}
              />
            ))}
            <span className="text-lg sm:text-xl md:text-2xl font-medium pl-2">Agree</span>
          </div>
        </div>
      </Transition>
    );
  };
  

const Questionnaire = () => {
  const [questions, setQuestions] = useState(["Lorem Ipsum FIrst Question","Lorem Ipsum Second Question","You can use a random sentence generator to create a sentence to start a story. Some sentence generators include"]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     // Replace with your API call
//     fetch(apiUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         setQuestions(data.questions); // Assuming the API returns an object with a questions array
//       });
//   }, [apiUrl]);

  const handleSelect = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
    // Move to next question after a delay
    setTimeout(() => {
      setCurrentQuestionIndex(index + 1);
    }, 300); // Delay of 300ms
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center p-6 bg-red-500">
      {questions.map((q, index) => (
        <Question
          key={index}
          question={q}
          index={index}
          onSelect={handleSelect}
          isCurrent={currentQuestionIndex === index}
          isCompleted={index < currentQuestionIndex}
        />
      ))}
    </div>
  );
};

export default Questionnaire;
