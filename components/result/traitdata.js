const TraitData = ({trait, traitScore}) => {
    const traitName = trait.trait;
    const traitScoreValue = traitScore;
    const traitDescription = trait.description;
    return (
      <div className="bg-gray-100 rounded-lg shadow p-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
                <div className="flex items-center text-yellow-400 mr-2">
                {/* Icon placeholder - replace with your actual icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c3.31 0 6-2.69 6-6 0 3.31-2.69 6-6 6zM12 8c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6zm0 0c3.31 0 6 2.69 6 6 0-3.31-2.69-6 6-6 0 3.31-2.69 6-6 6zM12 14c-3.31 0-6 2.69-6 6 0-3.31 2.69-6 6-6z" />
                </svg>
                </div>
                <h1 className="text-4xl font-semibold text-gray-900">{traitName}</h1>
            </div>        
            <div className="bg-pink-200 rounded-full h-4 w-16 mr-4">
                <div className="bg-pink-600 h-4 rounded-full text-xs" style={{ width: `${traitScore}%` }}> {traitScore}%</div>
            </div>
        </div>
  
        <p className="text-sm text-gray-600 mb-4">
          You didn't get the best results here dfghjk. Your result indicates that there are some trust issues that need to be addressed in your relationship.
        </p>
  
        <p className="text-sm text-gray-600 mb-4">
          Trust is a foundational aspect of any healthy relationship. When you can rely on each other to be honest, reliable, and supportive of each other's needs and boundaries, you are able to build a better and stronger emotional connection and navigate life's challenges together. Trust can also help you and your partner feel safe and secure in your relationship, which can promote greater happiness and fulfillment.
        </p>
  
        <p className="text-sm text-gray-600 mb-4">
          Trust issues can be a significant challenge in any relationship, and it's important to address them in a healthy and constructive way.
        </p>
  
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-sm text-gray-600">Be honest and transparent with your partner, even when it's uncomfortable or challenging.</li>
          <li className="text-sm text-gray-600">Acknowledge any past betrayals or trust violations, and work together to address them constructively.</li>
          <li className="text-sm text-gray-600">Prioritise building reliability and accountability in your relationship, and keep your promises to your partner.</li>
          <li className="text-sm text-gray-600">Be respectful of your partner's boundaries and needs, and seek to understand them better.</li>
          <li className="text-sm text-gray-600">Take time to build shared positive experiences that can help deepen your connection and foster trust.</li>
        </ul>
      </div>
    );
  };
  
  export default TraitData;
  