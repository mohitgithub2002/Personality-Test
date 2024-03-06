"use client"
import { Question } from "@/components/question/question"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InfoPage } from "@/components/question/infoPage";

const Test = ({params}) => {
    // fetch the testId from the params
    const testId = params.testId;
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

        // set currentQuestion to next
        if(pageIndex < questions.length){
            setCurrentQuestion(questions[pageIndex])
            setPageIndex(pageIndex+1);
        }
        else{
            setPageIndex(pageIndex+1);
            setLastPage(true);
        }
    }

    // framer motion variants
    const containerVariants = {
        hidden: { y: '100vw', opacity: 0 }, // Start off-screen to the right
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: 'smooth' ,duration: 0.7} 
        },
        exit: { y: '-100vw', opacity: 0, transition: { duration: 0.9 } }
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
    {pageIndex===0? <h1 className="text-4xl font-bold text-center mb-4">Let's Start The Test</h1>
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
            exit="exit" // Use exit property for exiting animation
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