"use client"
import PersonalitySummary from '@/components/PersonalitySummary';
import TraitBar from '@/components/TraitBar';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { checkUser } from '@/utils/auth';
import { ScaleLoader } from 'react-spinners';

export default function Results() {
  const [hoveredTraitIndex, setHoveredTraitIndex] = useState(null);
  const [user,setUser] = useState(null)
  const [loader,setLoader] = useState(true);
  
  async function fetchData(){
    setLoader(true);
    const user = await checkUser();
    setUser(user);
    setLoader(false);
  }
  useEffect(()=>{
    fetchData()
    console.log("user is ",user)
  },[])
  let score = user?user.categoryScore:[]
  const testData = {
    personalityType: 'Mediator (INFP-T)',
    traits: [
      { name: 'Introverted', score: score[0] },
      { name: 'Intuitive', score: score[1] },
      { name: 'feeling', score: score[2]},
      { name: 'Prospecting', score: score[3]},
      // { name: 'Turbulent', score: 91},
    ],
    // ... other test data
  };
  const ExpandedSection = ({ content ,index}) => {
    // You can style this component as needed
    const color = ["bg-orange-600", "bg-indigo-600", "bg-yellow-600", "bg-cyan-600","bg-teal-600"]
    const variants = {
      hidden: { opacity: 0, height: 0 },
      visible: { opacity: 1, height: 'auto' }
    };
  
    return (
      <motion.div
        className={`${color[index]} px-6 h-4 w-10/12 flex items-center justify-center `}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  };

  return (
     <div>
      {loader?<div className='flex flex-col h-screen w-full items-center justify-evenly bg-gray-50'><ScaleLoader color="#B67DFD" loading = {loader} /></div>
        :
      <div className="w-4/5 ">
        <main className="min-h-screen w-full flex flex-col px-4sm:px-10 items-center justify-center bg-gray-50 ">
        <div className="  text-xl sm:text-2xl md:text-4xl lg:text-6xl text-black py-10 flex items-start">
            <h1>Your Profile</h1>
        </div>
        {/* <div className=" flex flex-col lg:flex-row items-center justify-evenly p-10 bg-gray-50 h-1/2"> */}
            <PersonalitySummary type={testData.personalityType} />
            
            
            <div className="w-full m-4 flex flex-col items-center">
              {testData.traits.map((trait, index) => (
                <AnimatePresence key={index}>
                  <div className='w-full' onMouseEnter={() => setHoveredTraitIndex(index)} onMouseLeave={() => setHoveredTraitIndex(null)}>
                    <TraitBar trait={trait} index={index} isexpanded={hoveredTraitIndex===index} />
                  </div>
                  {hoveredTraitIndex === index && (
                    <ExpandedSection content={`Content for ${trait.name}`} index={index} />
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* {testData.traits.map((trait, index) => (
            <DetailedSection key={index} trait={trait} />
            ))} */}
        {/* </div> */}
        
      </main>
        </div>
        
      }
     </div>

      
    
  );
}
