import { motion } from 'framer-motion';

const TraitBar = ({ trait, index, onMouseEnter, onMouseLeave,isexpanded }) => {
  const barVariants = {
    hidden: { width: 0 },
    visible: { width: `${trait.score}%`, transition: { duration: 0.8 } },
  };
  
  const color = ["orange-600", "indigo-600", "yellow-600", "cyan-600","teal-600"]
  return (
    <div className='flex justify-center' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={`flex items-center mx-4 py-4 px-6 w-10/12  justify-around border-${color[index]} ${(isexpanded)?"border-2 bg-gray-200  shadow-lg shadow-inherit ":"border-0"}`}>
        <div className="w-3/5 sm:w-1/6">
          <span className=" font-quicksand font-semibold text-sm pr-2 text-black">{trait.name}</span>
        </div>
        <div className="w-4/5 bg-gray-200 rounded-full h-4">
            <motion.div
            className={`bg-${color[index]} h-4 rounded-full`}
            variants={barVariants}
            initial="hidden"
            animate="visible"
            />
        </div>
        <div className="w-3/5 sm:w-1/6 text-right">
                <span className="text-sm font-medium pl-2 text-black">{trait.score}%</span>
            </div>
        </div>
        
    </div>
    
  );
};

export default TraitBar;
