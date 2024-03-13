"use client"
import Image from "next/image";
import { useState } from "react";
export const Question = ({ questionText, onSelect }) => {
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
      if (index === 0 || index === 1 || index === 2) return (index===selected?'bg-agreecolor': 'border-2 border-agreeColor hover:bg-agreeColor'); // Bigger size for first and last button
      if (index === 4 || index === 5 || index === 6) return (index===selected?'bg-disagreecolor': 'border-2 border-disagreeColor hover:bg-disagreeColor'); // Intermediate size
      return  'border-2 border-gray-300 hover:bg-gray-300';; // Default size for middle buttons
    }
  
    return (
      <div className='m-8'>
        <div className=" flex flex-col items justify-around  ">
        <div className="text-gray-800 text-lg font-bold md:text-4xl md:font-semibold mb-8 text-center tracking-tight">{questionText}</div>
        {/* <div className="flex justify-center max-h-72"><Image src="/heart.jpeg" width={500} height={200} alt= "question_guide" className=" items-center" priority={false}  /></div> */}
        <div className="flex justify-between items-center my-4 mb-4">
          <h2 className='text-agreeColor text-xs md:text-2xl '>Disagree</h2>
          {[...Array(7)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`rounded-full ${buttonSizeClass(index)} ${
                buttonColorClass(index)
              } focus:outline-none transition duration-300 ease-in-out hover:shadow-2xl hover:scale-125 hover:drop-shadow-2xl hover:z-20 ` }
            />
          ))}
          <h2 className='text-disagreeColor text-xs md:text-2xl'>Agree</h2>
        </div>
      </div>
      </div>
    );
};