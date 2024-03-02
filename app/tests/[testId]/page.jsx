"use client"
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import  Image  from 'next/image';
import Cookies from 'js-cookie';
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
      if (index === 0 || index === 1 || index === 2) return index === selected ? ' bg-agreeColor' : 'border-2 border-agreeColor'; // Bigger size for first and last button
      if (index === 4 || index === 5 || index === 6) return index === selected ? ' bg-disagreeColor' : 'border-2 border-disagreeColor'; // Intermediate size
      return index === selected ? ' bg-gray-300' : 'border-2 border-gray-300';; // Default size for middle buttons
    }
  
    return (
      <div className=' w-full md:w-3/4  py-8  md:p-16 border-b-2 border-gray-500'>
        <div className="   ">
        <div className="text-gray-800 text-base md:text-2xl mb-8 text-center font-fredoka font-bold">{questionText}</div>
        <div className="flex justify-between items-center ">
          <h2 className='text-agreeColor text-xs md:text-2xl font-testcaliber '>Disagree</h2>
          {[...Array(7)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`rounded-full ${buttonSizeClass(index)} ${
                buttonColorClass(index)
              } focus:outline-none transition duration-300 ease-in-out hover:shadow-2xl hover:scale-125 hover:drop-shadow-2xl hover:z-20 ` }
            />
          ))}
          <h2 className='text-disagreeColor text-xs md:text-2xl font-fredoka'>Agree</h2>
        </div>
      </div>
      </div>
      
    );
};

const TestDetails = ({params}) => {
    // const router = useRouter();
    const  testId  = params.testId;
    const [test, setTest] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(Array(6).fill(null)); // Assuming max 6 questions per page
    const [islast, setIsLast] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [surveyScore, setSurveyScore] = useState(Array(5).fill(0));
    const [progress, setProgress] = useState(0);
    // You can also fetch test details and questions using testId if not passed as props
    useEffect(() => {
        const fetchDetails = async()=>{
          try{
            const data = await fetchTestDetails(testId);
            setTest(data.data);
            setQuestions(data.questionsList);
            setCurrentQuestions(data.questionsList[currentCategory].slice(0, 6));
          }catch(err){
            console.log(err);
          }
            
        }
        fetchDetails();
        
    }, []);

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = optionIndex;
        setSelectedOptions(newSelectedOptions);
    };
    
    const handleNextClick = () => {
        window.scrollTo({
          top: 400,
          behavior: 'smooth' // This makes the scrolling behavior smooth.
        });
        if(currentPage ==9){
          setIsLast(true);
        }
        else{
          const nextpage = currentPage + 1;
          setCurrentPage(nextpage);
          const currentcategory = Math.floor(nextpage/2);
          setCurrentCategory(Math.floor(nextpage/2));
          nextpage%2!==0?setCurrentQuestions(questions[currentcategory].slice(6,12)):setCurrentQuestions(questions[currentcategory].slice(0, 6))
          let totalScore =0;
          selectedOptions.forEach(responseIndex => {
            const score  = responseIndex-3;
            totalScore+=score
          });
          let previousScore = surveyScore;
          console.log("before" ,previousScore);
          previousScore[Math.floor((nextpage-1)/2)] += totalScore;
          console.log("before" ,previousScore);
          setSurveyScore(previousScore);
          console.log("category", Math.floor((nextpage-1)/2),": score ",surveyScore[Math.floor((nextpage-1)/2)]);
        }
        console.log("selected options",surveyScore)
        const newProgress = ((currentPage + 1) / 10) * 100; // Assuming there are 10 pages
        setProgress(newProgress);
        setSelectedOptions(Array(6).fill(null));
    };

    const handelSubmit = async() => {
        const categoryScore = [];
        surveyScore.forEach(scoreData => {
          categoryScore.push(Math.round(((scoreData+36)/72)*100));
        });
        console.log(categoryScore,name,email);
        alert( categoryScore,name,email );
        try{
          const res = await fetch('/api/personality',{
            method : 'POST',
            headers:{
                "content-type" : "application/json",
            },
            body: JSON.stringify({
                email: email,
                name : name,
                categoryScore: categoryScore,
            }),
          });
        const data = await res.json();
        Cookies.set('user', email, { expires: 7 });
        console.log(data);
        // router.push("/showresult");
        }catch(err){
          console.log(err);
          alert("something went wrong");
        }
        
    }
    
    return (
        <div className='h-full'>
          <div className='h-full' style={{backgroundImage:'url("/img/bgdesign.png")',backgroundSize: 'cover', backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
            <div className=" relative text-center px-4 md:px-16 h-screen "style={{ position: 'relative', height: '80vh', width: '100%' }} >
            <Image src= "/img/testbg.png"  layout="fill"  objectFit="cover" objectPosition='50% 60%' className="absolute z-0 h-4/5" />
            <div className="relative z-10 flex flex-col items-center justify-evenly h-3/4 py-4">
              {/* Topic Badge */}
              <div className="bg-blue-200 text-blue-800 px-3 py-1 inline-block uppercase tracking-wide text-xs font-semibold rounded-full">{test.category}</div>
    
              {/* Heading */}
              <h1 className="text-3xl md:text-5xl text-black font-poppins font-bold mt-4 mb-2">{test.title}</h1>
    
              {/* Description */}
              <p className="text-md md:text-xl text-gray-600 font-poppins my-4">{test.description}</p>
    
              {/* Other Info */}
              
    
              {/* Button */}
              {progress===0?
              <button onClick={()=>{window.scrollTo({
                top: 600,
                behavior: 'smooth' // This makes the scrolling behavior smooth.
              });}} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                Start test →
              </button>
              :
              <div className='flex items-center justify-center w-full mt-4 pt-4'>
                <div className="w-full md:w-3/4 bg-transparent rounded-xl">
                  <div className="bg-myblack rounded-l-xl text-xs leading-3 text-center text-white" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}>
                    {progress.toFixed(0)}%
                  </div>
                </div>
              </div>
              }
            </div>
            </div>
           
            
            
            {
              islast?
              <div className="flex flex-col items-center justify-center h-screen bg-white">
                <div className="w-full max-w-xl px-2">
                  <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                      <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >
                        name
                      </label>
                      <input required= {true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="your good name" onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-4">
                      <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        email
                      </label>
                      <input required= {true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="youremail@love.com" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                      <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                        mobile no. (to get resources on whatsapp)
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="number" placeholder="youremail@love.com" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <button className="flex items-center justify-center text-white px-16 py-4 rounded-xl bg-myblack transition ease-in-out delay-50 hover:scale-110 duration-300"  onClick={handelSubmit}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>:
              <div id='question-conatiner' className="  p-4 flex flex-col items-center justify-center">
                {currentQuestions.map((question, questionIndex) => (
                  <Question
                    key={`${currentPage}-${questionIndex}`}
                    questionText={question}
                    onSelect={(optionIndex) => handleOptionSelect(questionIndex, optionIndex)}
                    selected={selectedOptions[questionIndex]} // Pass the selected state
                  />
                ))}
                
                <button onClick={handleNextClick} className='flex items-center justify-center text-white px-16 py-4 m-12 rounded-xl bg-myblack transition ease-in-out delay-50 hover:scale-110 duration-300'>
                  NEXT
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="ml-2 w-5 h-5" id="Arrow"><path d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z" fill="#ffffff" className="color000000 svgShape"></path></svg>
                </button>
              </div>
              
            }
            
          
        </div>
        </div>
        
    );
};

export default TestDetails;

const fetchTestDetails = async (testId) => {
    // Fetch test details by ID
    try{
        const res = await fetch('/api/testdetail',{
        method : 'POST',
        headers:{
            "content-type" : "application/json",
        },
        body: JSON.stringify({
            testId: testId,
        }),
        });
        const data = await res.json();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }
    
    
};

