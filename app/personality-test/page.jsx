"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InfoPage } from "@/components/question/infoPage";

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

    // framer motion variants
    const containerVariants = {
        hidden: { y: '100vw', opacity: 0 }, // Start off-screen to the right
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: 'smooth' ,duration: 0.7, } 
        },
        exit: { y: '-100vw', opacity: 0, transition: {  delay: 0.5 } }
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

    return (
    <div>
    {pageIndex===0? <h1 className="text-4xl font-bold text-center mb-4">Let&apos;s Start The Test</h1>
    :
    <div>
        {lastPage? <InfoPage setName= {setName} setEmail= {setEmail} setMobile = {setMobile} handelSubmit = {handelSubmit} />
        :
        <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
        {/* Question component */}
        <div className="w-full md:w-5/6 h-3/5 overflow-hidden relative" >
            <motion.div 
            key={pageIndex} // Use pageIndex as key to trigger animation on change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // exit="exit" // Use exit property for exiting animation
            layout // Enable automatic layout animation
        >
            <Question questionText={currentQuestion.question} onSelect={(index) => handelSelection(index)} />
        </motion.div>
        </div>
        

      {/* shows the progress of the test */}
      <div className="w-full fixed bottom-0 left-0" >
        <div className="bg-bannerColor text-white text-center py-2 ">
          {(((pageIndex)/questions.length)*100).toFixed()}% Completed!
        </div>
        {/* add progress bar */}
        
        <ProgressBar completedPercentage={((pageIndex)/questions.length)*100} />
      </div>
        </div>
        }
        
    </div>
    
    }
    </div>
        
    
    )
}

// progress bar component
const ProgressBar = ({completedPercentage})=>{
    return(
        <div className="w-full bg-gray-700">
            <motion.div className="bg-gray-200 h-2"  
            initial={{ width: 0 }} // Start from 0 width
            animate={{ width: `${completedPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
        </div>
    )
}

export default Test




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
      if (index === 0 || index === 6) return 'h-8 w-8 md:h-12 md:w-12 '; // Bigger size for first and last button
      if (index === 1 || index === 5) return 'h-7 w-7 md:h-10 md:w-10'; // Intermediate size
      if (index === 2 || index === 4) return 'h-6 w-6 md:h-8 md:w-8'; // Intermediate size
      return 'h-3 w-3 md:h-6 md:w-6'; // Default size for middle buttons
    };
  
    const buttonColorClass = (index) => {
      if (index === 0 || index === 1 || index === 2) return (index===selected?'bg-agreeColor': 'border-4 border-agreeColor hover:bg-agreeColor'); // Bigger size for first and last button
      if (index === 4 || index === 5 || index === 6) return (index===selected?'bg-disagreeColor': 'border-4 border-disagreeColor hover:bg-disagreeColor'); // Intermediate size
      return  'border-2 border-gray-300 hover:bg-gray-300';; // Default size for middle buttons
    }



      
  
    return (
      <div className='m-8'>
        <div className=" flex flex-col items justify-around  ">
        <div className="text-gray-800 text-lg font-bold md:text-4xl md:font-semibold mb-8 text-center tracking-tight border-2 border-black rounded-tl-3xl rounded-br-3xl rounded px-4 py-16 bg-white">{questionText}</div>
        {/* <div className="flex justify-center max-h-72"><Image src="/heart.jpeg" width={500} height={200} alt= "question_guide" className=" items-center" priority={false}  /></div> */}
        <div>
            <div className="flex justify-between items-center my-4 mb-4">
            <h2 className='hidden md:block md:text-agreeColor  md:text-2xl  '>Disagree</h2>
            {[...Array(7)].map((_, index) => (
                <button
                key={index}
                onClick={() => handleSelect(index)}
                className={` ${buttonSizeClass(index)} ${
                    buttonColorClass(index)
                } rounded-full focus:outline-none transition duration-300 ease-in-out hover:shadow-2xl hover:scale-125 hover:drop-shadow-2xl hover:z-20 ` }
                />   
                
            ))}
            <h2 className='hidden md:block md:text-disagreeColor md:text-2xl'>Agree</h2>
            </div>
            <div className="flex justify-between items-center my-4 mb-4 md:hidden">
                <h2 className='text-agreeColor text-xs md:text-2xl '>Disagree</h2>
                <h2 className='text-disagreeColor text-xs md:text-2xl'>Agree</h2>
            </div>
        </div>
        
      </div>
      </div>
    );
};