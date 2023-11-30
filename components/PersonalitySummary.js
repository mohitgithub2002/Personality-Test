import { motion } from 'framer-motion';

const PersonalitySummary = ({ type }) => {
  const summaryVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center bg-gradient-80 from-color1 via-color2 to-color3 rounded-lg p-6 shadow-lg text-center w-10/12"
      variants={summaryVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-2xl font-quicksand font-semibold border-b-2 pb-2 sm:border-r-2 sm:border-b-0">{`Your Personality Type: ${type}`}</h1>
      <p className="text-md py-2 sm:p-2">Description based on the personality type... https://next-auth.js.org/providers/email https://next-auth.js.org/providers/email https://next-auth.js.org/providers/email https://next-auth.js.org/providers/email https://next-auth.js.org/providers/email</p>
      <div className='font-quicksand flex flex-col justify-center border-t-2 sm:border-l-2 sm:border-t-0 sm:pl-2'>
        <h2>Score</h2>
        <h1>61</h1>
      </div>
    </motion.div>
  );
};

export default PersonalitySummary;
