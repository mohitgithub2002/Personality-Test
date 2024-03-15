import { ScaleLoader } from "react-spinners";

const Loader = ({isLoading})=>{
    return(
        <div className="bg-white flex items-center justify-center h-screen">
            <ScaleLoader color="#000000" loading={isLoading}/>
        </div>
        
    )
}

export default Loader;