"use client"
import React, { useState } from 'react';
import TraitData from './traitdata';



const TabComponent = ({trait, traitScore}) => {
  const [activeTab, setActiveTab] = useState('communication');
  const tabs =  trait.map((item,index) => {
    return {
      key: index,
      name: item.trait
    }
  });

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <div className='flex flex-col justify center items-center'>
      <ul className="flex flex-wrap justify-center gap-2 w-3/4">
        {tabs.map((tab) => (
          <li key={tab.key} className="-mb-px mr-1">
            <button
              className={` inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold ${
                activeTab === tab.key ? 'border-l border-t border-r rounded-t bg-gray-100' : 'bg-white'
              }`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center ">
      <div className='w-2/3'><TraitData trait = {trait[activeTab]} traitScore = {traitScore[activeTab]} /></div>
        {/* {activeTab === 'communication' && <div className='w-2/3'><TraitData name = {activeTab} /></div>} */}
        {/* {activeTab === 'trust' && <div className='w-2/3'><TraitData /></div>}
        {activeTab === 'intimacy' && <div className='w-2/3'><TraitData /></div>}
        {activeTab === 'compatibility' && <div className='w-2/3'><TraitData /></div>} */}
      </div>
    </div>
  );
};

export default TabComponent;
