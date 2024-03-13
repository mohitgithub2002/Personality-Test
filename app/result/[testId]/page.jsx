
"use client"
import TabComponent from '@/components/result/alltrait';
import { useEffect, useState } from 'react';
import MyChartComponent from '@/components/result/chartComponent';
import Cookies from 'js-cookie';

const Result = ({params}) => {
  const testId = params.testId;
  const email = Cookies.get('user');
  // state variable to store the result
  const [score, setScore] = useState(); // score of the test
  const [trait, setTrait] = useState([]); // traits of the test
  const [traitScore, setTraitScore] = useState([]); // trait score of the test

  

  useEffect(()=>{
    const fetchResult = async ()=>{
      //fetch the test result data from the results api endpoint
      try{
        const res = await fetch(`/api/results/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email,testId})
        });
        const result = await res.json();
        console.log(result);
        // stoer the result data in state variables
        setScore(result.data.score);
        setTrait(result.data.traits);
        setTraitScore(result.data.categoryScore)
      }catch(err){
        console.log(err);
      }
      
    }
    fetchResult();
  },[])
  return (
    <div className='bg-white '>
      <div>
        <div className="bg-gray-100 text-gray-800 pt-16 px-8 md:px-16 shadow-lg rounded-md">
          <div className=" border-b-2 border-gray-400">
              <h1 className="text-6xl font-bold text-center mb-4">Let&apos;s Review Your Results 🎉</h1>
              <p className="text-2xl text-center mb-8">Thanks for completing the assessment - We hope that the results will provide you with valuable insights and a deeper understanding of yourself.
              </p>
          </div>
        </div>
        <div className=" pt-10 mx-auto px-4 md:flex items-center justify-evenly bg-gray-100">
          <div className="text-start px-8 md:px-16">
            <h1 className="text-3xl font-bold mb-4 text-black">You didn't do too bad...</h1>
            <p className="text-xl mb-4 text-black ">
              Your results indicate that you have a generally healthy relationship, but there
              may be some areas for improvement. There may be some communication breakdowns,
              trust issues, intimacy concerns, or compatibility mismatches that are worth
              exploring further. Remember that every relationship has its ups and downs,
              and seeking outside support can be a helpful tool in overcoming these challenges.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <MyChartComponent  traitScore = {traitScore} trait = {trait} />
            <div className="text-center mt-4 z-10 absolute">
            
            <p className="text-2xl sm:text-4xl font-bold text-black mr-12 sm:mr-20 mb-2">{score}%</p>
          </div>
          </div>
        </div> 
      </div>
      
      <div className='mt-8  flex flex-col items-center justify-center'>
        <div className='flex justify-center my-8'>
          <h1 className='text-2xl md:text-6xl text-black'>Score Breakdown</h1>
        </div>
        <TabComponent trait = {trait} traitScore = {traitScore} />
      </div>
      
    </div> 
  );
};

export default Result;
