"use client"
import { useState } from 'react';

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
    if (index === 0 || index === 6) return 'h-12 w-12'; // Bigger size for first and last button
    if (index === 1 || index === 5) return 'h-10 w-10'; // Intermediate size
    if (index === 2 || index === 4) return 'h-8 w-8'; // Intermediate size
    return 'h-6 w-6'; // Default size for middle buttons
  };

  return (
    <div className=' w-3/4'>
      <div className="my-4   ">
      <div className="text-gray-800 text-2xl mb-6 text-center font-quicksand">{questionText}</div>
      <div className="flex justify-between items-center ">
        <h2 className='text-green-600 text-2xl font-quicksand'>Agree</h2>
        {[...Array(7)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`rounded-full ${buttonSizeClass(index)} ${
              index === selected ? 'bg-green-500' : 'bg-gray-300'
            } focus:outline-none transition duration-300 ease-in-out`}
          />
        ))}
        <h2 className='text-green-600 text-2xl font-quicksand'>Disagree</h2>
      </div>
    </div>
    </div>
    
  );
};

const Survey = () => {
    // Fetch the question from an API
    const questionText = 'You regularly make new friends.'; // Replace with API fetched data
  
    const handleOptionSelect = (index) => {
      console.log(`Option ${index + 1} selected`);
      // Handle the selected option here (e.g., save it to state or send to an API)
    };
  
    return (
      <div className=' h-screen bg-white'>
        <div className="bg-gray-50 p-4 flex flex-col items-center justify-center">
          <Question questionText={questionText} onSelect={handleOptionSelect} />
        </div>
      </div>
      
    );
  };
  
  export default Survey;
