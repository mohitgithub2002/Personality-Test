"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
export function UserDetails() {
    const router = useRouter();
    const [loader,setLoader] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            setLoader(true);
            const res = await fetch('/api/register',{
                method : 'POST',
                headers:{
                    "content-type" : "application/json",
                },
                body: JSON.stringify({
                    name : e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    

                }),
            });
            const data =await res.json();
            console.log(res, data);
            if(data.status ===400){
                setLoader(false);
                Swal.fire({
                    icon: 'info',
                    title: 'Already a member',
                    text: "Already registered please login to continue",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar:true
                })
                setTimeout(()=>{
                    router.push('/login');
                },1999)
                
            }
            if(data.status === 201 ){
                setLoader(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Thanks for signup',
                    text: "Please login to continue",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar:true
                })
                setTimeout(()=>{
                    router.push('/login');
                },1999)
            }
        }catch(err){
            setLoader(false);
            console.log(err);
        }
        console.log("Submitted");

    }

    const handelGoogle = async() => {
        try{
            const res = await signIn("google",{
                redirect: false,
            });
            if(res.error){
                setError(res.error);
                console.log("Invalid credentials");
            }else{
                console.log(res);
                router.push('/dash');
            }
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
  return (
    <main className="w-full bg-gradient-80 from-color1 via-color2 to-color3 h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                <div className="text-center">
                    
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                        <p className="">Already have an account? <a href="/login" className="font-medium text-color3 hover:opacity-60">Log in</a></p>
                    </div>
                </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"

                    >
                        <div>
                            <label className="font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Harry Potter"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-color1 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="harrypotter@example.com"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-color1 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-color1 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-gradient-80 from-color1 via-color2 to-color3 hover:scale-105 active:bg-pink-600 rounded-lg duration-150"
                        >
                            {loader?<BeatLoader color="white" size={10} />:"Create account"}
                        </button>
                    </form>
                    <div className="mt-5">
                        <button onClick={handelGoogle} className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 hover:border-color1 active:bg-gray-100">
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_17_40)">
                                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_17_40">
                                        <rect width="48" height="48" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </main>
  );
}