"use client"
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const PageInfo = ({ scores, description, index,setIndex, personality }) => {
  const category = ["Emotional Style", "Communication Approach", "Conflict Resolution", "Relationship Focus"]
  const bgColor = ["#f9dbdc","#F5EDFC", "#FCF2EA", "#E6F2EB", "#E9F1F6"];
  const mainColor = ["#9b51e0", "#e0822f", "#0b843e", "#2779a7"]
  const handelNext=()=>{
    if(index<4){
      setIndex(index+1)
    }
  }
  const handelPrev=()=>{
    if (index>0){
    setIndex(index-1)
    }
  }
  return (
    <div className=" h-screen overflow-auto flex flex-col items-center justify-center"style={{ backgroundColor:bgColor[index]} }>
      <div className="w-11/12 max-w-4xl mx-auto  bg-white px-10 py-4 m-4 md:h-3/5">
        <div className="flex justify-between items-center">
          <button className="text-myblack" onClick={handelPrev} disabled={index===0}>BACK</button>
          <div className="md:flex md:items-center md:space-x-4 hidden">
            {Array.from({ length: 5 }, (_, position) => (
              <div key={position} className={`h-2 w-2 rounded-full ${position === index ? 'bg-myblack' : 'bg-gray-300'}`}></div>
            ))}
          </div>
          <button className="bg-myblack text-white px-6 py-2 rounded" onClick={handelNext} disabled={index===4}>Next</button>
        </div>
        {index===0?
          <div className="mt-4 md:mt-6">
            <h3 className="text-2xl font-quicksand font-semibold text-myblack text-center py-4" >Your Personality Score</h3>
            <h1 className="font-bold text-lg md:text-3xl uppercase text-lavender text-center">{personality[0]} / 100</h1>
            <div className="my-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className=" h-2.5 rounded-full bg-lavender" style={{ width: `${personality[0]}%`} }></div>
                </div>
              </div>
            <img  />
            <div className="mt-4 text-center text-gray-600 ">{personality[2]}</div>
          </div>
        :
          <div className="mt-6 md:mt-8">
              <h1 className="text-3xl font-bold text-center py-4" style={{ color: mainColor[index-1]}}>{category[index-1]}</h1>
              <div className="mt-4 flex items-center justify-center">
                {/* <div className="text-2xl font-poppins " style={{ color: mainColor[index-1] }}>{scores[index-1]}% Energetic</div> */}
              </div>
              <div className="my-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${scores[index-1]}%`,backgroundColor:mainColor[index-1]} }></div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='text-myblack'style={{ color: mainColor[index-1]}}>{scores[index-1]}%</div>
                <div className='text-myblack'>{100-scores[index-1]}%</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-myblack'style={{ color: mainColor[index-1]}}>{trait[index-1][0]}</div>
                <div className='text-myblack'>{trait[index-1][1]}</div>
              </div>
              <div className="mt-4 text-center text-gray-600">{description[index-1]}</div>
            </div>
        }
        
      </div>
    </div>
  );
};

const SurveyPage = () => {
  const [email,setEmail] = useState(Cookies.get("user"));
  const [result, setResult] =useState();
  const [scores, setScores] = useState();
  const [description, setDescription] = useState();
  const [trait,setTrait] =useState();
  const [index, setIndex] = useState(0);
  const [personality, setPersonality] = useState();
  // Example data, you would fetch this or calculate based on user's answers
  const fetchData = async()=>{
    try{
      const res = await fetch('/api/result',{
      method : 'POST',
      headers:{
          "content-type" : "application/json",
      },
      body: JSON.stringify({
          email: email,
      }),
    });
    const data = await res.json();
    setResult(data.data);
    setScores(data.data.categoryScore);
    setDescription(data.data.aboutCategory)
    setPersonality([data.data.score, data.data.about])
    console.log(data.data);
    }catch(err){
      console.log(err);
    }
    
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  
  
  
  
  return (
    <div>
      {result?
      <PageInfo scores={scores} description={description} index={index} setIndex={setIndex} personality = {personality}/>
    :
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    }
    </div>
    
    
  );
};

export default SurveyPage;
