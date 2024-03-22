"use client"
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const QuestionCard = ({params}) => {
  const testId = params.testId;
  const email = Cookies.get('user')
  // State to store the selected options as an array
  const [userResponse , setUserResponse] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [testDetails, setTestDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  // The options array could be a prop or state if dynamic, for this example it's hardcoded
  const options = ['Yes', 'No', 'Maybe'];

  // Function to handle option selection
  const handleSelectOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      // Check if the option is already selected
      if (prevSelectedOptions.includes(option)) {
        // If it is, remove it from the array
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      } else {
        // If it's not, add it to the array
        return [...prevSelectedOptions, option];
      }
    });
  };

  // Function to check if the option is selected
  const isOptionSelected = (option) => {
    return selectedOptions.includes(option);
  };

  //Useffect to fetch the data from the server 
  useEffect(() => {
    const fetchDetails = async () => {
      try{
        const res =  await fetch('/api/testdetails',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({testId:testId })
        });
        const response = await res.json();
        console.log(response.data);
        setTestDetails(response.data);
        setQuestions(response.data.questions)
        setCurrentQuestion(response.data.questions[0])
      }catch(err){
        console.log(err);
      }
       
    }
    fetchDetails();
  }, []);

  const handelNext = () => {
    const questionResponse = {
        category: currentQuestion.category,
        answer: selectedOptions
    }
    setUserResponse(userResponse => [...userResponse, questionResponse]);
    setSelectedOptions([]);
    if(currentQuestionIndex < questions.length - 1){
        
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    
    
  }


  const handleBack = () => {
    // Ensure currentQuestionIndex doesn't go below 0
    const newIndex = currentQuestionIndex > 0 ? currentQuestionIndex - 1 : 0;
    setCurrentQuestionIndex(newIndex);
    setCurrentQuestion(questions[newIndex]);
  
    // Remove the last response from userResponse
    setUserResponse(currentResponses => currentResponses.slice(0, -1));
  
    // Optionally, restore selectedOptions to the previous question's response
    // This assumes each questionResponse in userResponse aligns with questions array
    const previousResponse = newIndex >= 0 ? userResponse[newIndex ]?.response : [];
    setSelectedOptions(previousResponse || []);
  };

  const handelSubmit = async() => {
    const finalResponses = [
      ...userResponse, // Spread existing responses
      {
        category: currentQuestion.category, // Include last response's category
        answer: selectedOptions // Include last response's selected options
      }
    ];
  try{
    const res = await fetch('/api/submit',{
      method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email,testId: testId, answers: finalResponses})
    });
    const response = await res.json();
    console.log(response);
  }catch(err){
    console.log(err);
  }
    
    }

  // Determine button container classes based on number of options
  const buttonContainerClasses = options.length <= 2 ? 'flex-row' : 'flex-col';

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-white ">
      <div className="w-full max-w-4xl px-6 py-8 mt-12 md:mx-48">
           <button onClick={handleBack} disabled={currentQuestionIndex===0} className="text-gray-600 text-sm md:text-base mb-1 md:mb-4">← GO BACK</button>
           <div className="mb-6 text-start">
             <h2 className="text-lg md:text-2xl  text-gray-600 mb-4">Communication</h2>
             <p className="text-3xl md:text-4xl text-gray-700 font-semibold">{currentQuestion.question}</p>
           </div>
            <div className={`flex ${buttonContainerClasses} justify-start gap-4 md:w-1/2`}>
                {currentQuestion.options && currentQuestion.options.map((option) => (
                <button
                    key={option.id}
                    className={`${
                    isOptionSelected(option.id)
                        ? 'bg-blue-500   text-white'
                        : 'bg-gray-50 text-nextColor'
                    }  px-6 py-3 rounded-2xl font-semibold ring-1 ring-gray-300 hover:ring-nextColor hover:ring-opacity-100`}
                    onClick={() => handleSelectOption(option.id)}
                >
                    {option.option}
                </button>
                ))}
            </div>
        </div>
        <div className='flex justify-center items-center w-full mt-4 md:mt-12'>
            <div className="flex justify-start mb-4 w-full px-6  md:ml-48">
                <button onClick={currentQuestionIndex===questions.length-1?handelSubmit:handelNext} className="bg-blue-500 text-white px-2 md:px-8 py-3 rounded-2xl w-1/2 md:w-1/6  shadow-md shadow-inherit"> {currentQuestionIndex===questions.length-1?"SUBMIT":"NEXT →"} </button>
            </div>
        </div>
        <div className="fixed left-0 right-0 bottom-0 z-50 flex justify-center p-4">
            <div className="mt-8 w-3/4 flex flex-col justify-around items-center">
                <div className="text-right mt-2 text-gray-600 mb-2">{(currentQuestionIndex*100)/questions.length}% Completed!</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-nextColor h-2.5 rounded-full" style={{ width: `${(currentQuestionIndex*100)/questions.length}%` }}></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuestionCard;

