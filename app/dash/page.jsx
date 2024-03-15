"use client"
import {useEffect, useState} from 'react';
// import selfAwarenessImage from '@/public/img/Ideation.png'; 
import Image from 'next/image';
import Link from 'next/link';

const Card = ({  title, category, description, _id }) => {

  

  return (
    <div className="bg-white  p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105  w-300 h-450" >
      <div className='flex flex-col justify-around'>
        <Image src="/heart.png" width={50} height={50} alt='logo' className='my-2' />
        <div className='my-4'>
          <h3 className="text-xl md:text-2xl font-bold  text-gray-700 ">{title}</h3>
          <p  className={`text-gray-500  p-1 text-xs max-w-fit  `}>{category} </p>
          <p className="text-gray-600 ">{description}</p>
        </div>
        
        
        <Link className="flex justify-between my-2" href={`/test/${_id}`}>
          <button  className="bg-blue-500 text-white px-4 py-2 rounded-md">Take Test</button>
          {/* <button onClick={onViewResult} className="bg-green-500 text-white px-4 py-2 rounded-md">View Result</button> */}
        </Link>
      </div>

      
    </div>
  );
};



const CardList = ({ tests }) => {
  return (
    <div  className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 gap-x-6 mt-8 mx-8 md:mt-20 md:mx-20 py-8">
      {tests.map((test, index) => (
        <div key={index} className="">
          <Card {...test} />
        </div>
      ))}
    </div>
  );
};



const Test =  () => {

  const [tests, setTests] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const test = await fetchTestsData();
      setTests(test);
    }
    fetchDetails();
    
  }, []);
  console.log(tests);
 const [selectedType, setSelectedType] = useState('All'); // Set 'All' as the initial type

  const filterCardsByType = (type) => {
    setSelectedType(type);
  };

  const filteredCards = selectedType === 'All' ? tests : tests.filter((test) => test.category === selectedType);

  return (
    <div className=" min-h-screen h-full bg-white">
      <div className= "flex flex-col items-center justify-center bg-white py-16 px-8">
        <h1 className="text-4xl md:text-6xl font-bold mt-10 text-center text-gray-700">Tests for better Relationship</h1>
        <p className="mt-6 text-lg md:text-xl text-center text-gray-700">Personalised Test for identifying problems and help you to solve problems, make decisions and understand relationship better.</p>
        
      
        
        <div className="mt-6">
          <button className="text-white bg-cyan-700 p-3 rounded-md"><a href="/personality-test">Personality Test</a></button>
        </div>
      </div>


     <div id="tools" className="mt-8">
        <h2 className=" text-center text-3xl font-bold text-gray-700">Curated collection of analysis tests</h2>
    
        <div className="flex flex-wrap items-center justify-center mt-8 ml-5 mb-16 ">
          
          <button
            // key={tests[0].category}
            onClick={() =>  filterCardsByType('All')}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-white bg-black rounded-md'}
          >
            ALL
          </button>
        
          <button
            // key={tests[0].category}
            onClick={() =>  filterCardsByType(tests[0].category)}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-yellow-500 border border-yellow-500 hover:bg-yellow-700 hover:text-white active:bg-yellow-700 active:text-white rounded-md'}
          >
            {/* {tests[0].category} */}
            one
          </button>
        
          <button
            // key={tests[1].category}
            onClick={() =>  filterCardsByType(tests[1].category)}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-purple-500 border border-purple-500 hover:bg-purple-700 hover:text-white rounded-md'}
          >
            {/* {tests[1].category} */}
            two
          </button>
          
          <button
            // key={tests[2].category}
            onClick={() =>  filterCardsByType(tests[2].category)}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-green-500 border border-green-500 hover:bg-green-700 hover:text-white rounded-md'}
          >
            {/* {tests[2].category} */}
            three
          </button>
        
          <button
            // key={tests[3].category}
            onClick={() =>  filterCardsByType(tests[3].category)}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-pink-500 border border-pink-500 hover:bg-pink-700 hover:text-white rounded-md'}> 
                    {/* {tests[3].category}   */}
                    five
          </button>
          
          <button
            // key={tests[4].category}
            onClick={() =>  filterCardsByType(tests[4].category)}
            className={'px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-blue-500 border border-blue-500 hover:bg-blue-700 hover:text-white rounded-md'}
          >
            {/* {tests[4].category} */}
            four
          </button>
        </div>
        
        <CardList tests={tests} />
      </div>

    </div>
  );
};

export default Test;

const fetchTestsData = async () => {
  const res = await fetch('/api/testlist');
  const data = await res.json();
  console.log(data.data);
  return data.data;
}
// export async function getServerSideProps() {
//   const tests = await fetchTestsData(); // Implement fetchTestsData to get tests from your backend
  
//   return { props: { tests } };
// }




