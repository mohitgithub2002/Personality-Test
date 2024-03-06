
export const InfoPage = ({setName, setEmail,setMobile, handelSubmit }) => {
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-around">
        <div className="bg-gray-100 text-gray-800 p-8 max-w-6xl shadow-lg rounded-md">
            <div className=" border-b-2 border-gray-400">
                <h1 className="text-4xl font-bold text-center mb-4">Let's Review Your Results 🎉</h1>
                <p className="text-center mb-8">Thanks for completing the assessment - We hope that the results will provide you with valuable insights and a deeper understanding of yourself.
                Please fill the details to get the result</p>
            </div>
            
            <div className="flex justify-center  ">
                <div className="bg-gray-100 w-full md:w-1/2 px-8 pt-6 pb-8 my-4">
                <div className="mb-4">
                    <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >
                    name
                    </label>
                    <input required= {true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="your good name" onChange= {(e)=>{setName(e.target.value)}} />
                </div>
                <div className="mb-4">
                    <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    email
                    </label>
                    <input required= {true} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="youremail@love.com" onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className=" font-quicksand block text-gray-700 text-sm font-bold mb-2" htmlFor="number">
                    mobile no. (to get resources on whatsapp)
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="number" placeholder="youremail@love.com" onChange={e=>setMobile(e.target.value)}/>
                </div>
                <div className="flex items-center justify-center">
                    <button className="flex items-center justify-center text-white px-16 py-4 rounded-xl bg-myblack transition ease-in-out delay-50 hover:scale-110 duration-300"  onClick={handelSubmit}>
                    Submit
                    </button>
                </div>
                </div>
            </div>
            
        </div>
    </div>
    
  );
}