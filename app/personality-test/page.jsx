"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InfoPage } from "@/components/question/infoPage";
import Image from "next/image";
import Loader from "@/components/loader";

const Test = () => {
    // fetch the testId from the params
    const testId = "65ddf5e36459208571c1dac9"
    const [test, setTest] = useState({}); // state variable to store the whole test data
    const [questions, setQuestions] = useState([]); // state variable to store the questions of the test
    const [currentQuestion, setCurrentQuestion] = useState({}); // state variable to store the current question
    const [pageIndex,setPageIndex] = useState(1); // state variable to store the current page index
    const [answers, setAnswers] = useState([{}]); // state variable to store the answers of the test
    const [categoryScore, setCategoryScore] = useState([]); // state variable to store the category score of the test
    const [lastPage, setLastPage] = useState(false); // state variable to store the last page of the test

    // user details on the last page
    const [name, setName] = useState(""); // state variable to store the name of the user
    const [email, setEmail] = useState(""); // state variable to store the email of the user
    const [mobile, setMobile] = useState(""); // state variable to store the mobile of the user

    //Loader for Loading state
    const [isLoading, setIsLoading] = useState(true);

    //Animation direction state
    const [animationDirection, setAnimationDirection] = useState('forward');
    // Fetch the test data from the api/test and populate the currentQuestion state variable
    useEffect(()=>{
        // fetch the test data here and populate current question state variable
        const fetchquestions = async()=>{
            try{
                const response = await fetch(`/api/test`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({testId})
    
                });
                const res = await response.json();
                console.log(res)
                setTest(res.data);
                setQuestions(res.data.questions);
                const firstQuestion = res.data.questions[0];
                setCurrentQuestion(firstQuestion); 
                setIsLoading(false);
            }catch (error){
                console.log(error);
            }
        }
        fetchquestions();
    },[])

    // handel the selection of the answer and store the answer and set currentQuestion to next
    const handelSelection = (index)=>{
        // store the answer
        const answer = {
            "category": currentQuestion.category,
            "answer": index
        }
        setAnswers([...answers,answer]);

        //calculate category score
        const category = currentQuestion.category-1;
        let catScore = categoryScore;
        if(catScore[category]===undefined){
            catScore[category] = 0;
        }
        catScore[category] = catScore[category] + index;
        setCategoryScore(catScore)
        console.log(answer)
        console.log(categoryScore);
        setAnimationDirection("forward")
        setTimeout(()=>{
            if(pageIndex < questions.length){
                setCurrentQuestion(questions[pageIndex])
                setPageIndex(pageIndex+1);
            }
            else{
                setPageIndex(pageIndex+1);
                setLastPage(true);
            }
        },300)
        // set currentQuestion to next
        
    }

    //handel back button
    const handelBack = () =>{
        if (pageIndex > 1) { // Ensuring we don't go back if we are on the first question
            setPageIndex(pageIndex - 1);
            setCurrentQuestion(questions[pageIndex - 2]); // Adjusting for zero-based index, to go back to previous question
            setAnimationDirection("backward")
        }
    }

    // framer motion variants
    const containerVariants = {
        hidden: (back) => ({
            y: back ? '-100vh' : '100vh',
            opacity: 0
          }),
          visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'smooth', duration: 0.7 }
          },
        exit: (back) => ({
            y: back ? '100vh' : '-100vh',
            opacity: 0,
            transition: { delay: 0.5 }
        })
    }
    // Function to submit the test
    const handelSubmit = async()=>{
        // submit the test
        let userScore = [];
        console.log(categoryScore.length);
        for (let index = 0; index < categoryScore.length; index++) {
            let element = categoryScore[index];
            element = Math.round((element/(test.categoryLength[index]*6))*100);
            userScore[index] = element;
        }

        try{
            const response = await fetch(`/api/submittest`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name,email,mobile,testId,categoryScore:userScore})
            });
            const res = await response.json();
            console.log(res);
        }catch(err){
            console.log(err);
        }

    }
    if(isLoading){
        return(
            <Loader isLoading={isLoading} />
        )
    }
    return (
    <div>
    {pageIndex===0 ? 
    <h1 className="text-4xl font-bold text-center mb-4">Let&apos;s Start The Test</h1>
    :
    <div>
        {lastPage? 
        <InfoPage setName= {setName} setEmail= {setEmail} setMobile = {setMobile} handelSubmit = {handelSubmit} />
        :
        <div className="flex flex-col items-center justify-center min-h-screen  w-full h-full bg-white">
            {/* Question component */}
            <div className="w-full md:w-5/6 h-3/5 overflow-hidden relative" >
                <motion.div 
                key={pageIndex} // Use pageIndex as key to trigger animation on change
                custom={animationDirection === 'backward'}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                layout // Enable automatic layout animation
                >
                    <Question questionText={currentQuestion.question} onSelect={(index) => handelSelection(index)}  />
                </motion.div>
            </div>
            <div className="w-full md:w-5/6 flex justify-start items-center mt-16 ">
                <button onClick={handelBack} className="h-10 w-10 md:h-auto md:w-auto flex items-center justify-center pr-2 mx-4 md:ml-20 md:border-2 border-black border-solid">
                <BackArrow /><span className="text-black font-bold ">Back</span>
                </button>
            </div>

            {/* shows the progress of the test */}
            <div className="w-full fixed bottom-0 left-0 " >
                <div className="bg-white text-black text-center py-6 ">
                <div className="mb-2">  {(((pageIndex)/questions.length)*100).toFixed()}% Completed! </div>
                <ProgressBar completedPercentage={((pageIndex)/questions.length)*100} />
                </div>
            </div>
        </div>
        }
        
    </div>
    
    }
    </div>
        
    
    )
}


export default Test

// progress bar component
const ProgressBar = ({completedPercentage})=>{
    return(
        <div className="flex justify-center items-center">
            <div className="w-3/4 flex bg-gray-200 rounded-l-xl rounded-r-xl">
            <motion.div className="bg-gray-700 h-2 rounded-l-xl"  
            initial={{ width: 0 }} // Start from 0 width
            animate={{ width: `${completedPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
        </div>
        </div>
        
    )
}


// back arrow component
const BackArrow = () => (
    <Image 
    src="/back.svg" 
    alt= "previous"
    width={50}
    height={50}
    />
  );
  



const Question = ({ questionText, onSelect }) => {
    // State to handle the selected option
    const [selected, setSelected] = useState(null);
  
    // Function to handle option select
    const handleSelect = (index) => {
      setSelected(index);
      onSelect(index);
    };
  
    // Function to determine the size of the button based on its index
    const buttonSizeClass = (index) => {
      if (index === 0 || index === 6) return 'h-[45px] w-[45px] md:h-[70px] md:w-[70px] '; // Bigger size for first and last button
      if (index === 1 || index === 5) return 'h-[35px] w-[35px] md:h-[55px] md:w-[55px]'; // Intermediate size
      if (index === 2 || index === 4) return 'h-[28px] w-[28px] md:h-[45px] md:w-[45px]'; // Intermediate size
      return 'h-[25px] w-[25px] md:h-[30px] md:w-[30px]'; // Default size for middle buttons
    };
  
    const buttonColorClass = (index) => {
      if (index === 0 || index === 1 || index === 2) return (index===selected?'bg-agreeColor': 'border-2 border-agreeColor hover:bg-agreeColor'); // Bigger size for first and last button
      if (index === 4 || index === 5 || index === 6) return (index===selected?'bg-disagreeColor': 'border-2 border-disagreeColor hover:bg-disagreeColor'); // Intermediate size
      return  'border-2 border-gray-300 hover:bg-gray-300';; // Default size for middle buttons
    }



      
  
    return (
      <div className='m-4 md:m-8'>
        <div className="flex flex-col  justify-around">
            
            <div className=" flex flex-col items justify-center  ">
                <div className="text-gray-600 text-2xl font-bold md:text-4xl md:font-semibold mb-8 text-center tracking-tight  rounded md:px-4 py-4 md:py-16  ">{questionText}</div>
                {/* <div className="flex justify-center max-h-72"><Image src="/heart.jpeg" width={500} height={200} alt= "question_guide" className=" items-center" priority={false}  /></div> */}
                <div className="flex justify-center gap-4 md:gap-8  items-center my-4 mb-4">
                <h2 className='hidden md:block md:text-agreeColor  md:text-2xl  '>Disagree</h2>
                {[...Array(7)].map((_, index) => (
                    <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={` ${buttonSizeClass(index)} ${
                        buttonColorClass(index)
                    } rounded-full focus:outline-none transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:drop-shadow-2xl hover:z-20 ` }
                    />   
                    
                ))}
                <h2 className='hidden md:block md:text-disagreeColor md:text-2xl'>Agree</h2>
                </div>
                <div className="flex justify-between items-center mx-2 mb-4 md:hidden">
                    <h2 className='text-agreeColor text-xs md:text-2xl '>Disagree</h2>
                    <h2 className='text-disagreeColor text-xs md:text-2xl'>Agree</h2>
                </div>

            </div>
            
        </div>
        
      </div>
    );
};