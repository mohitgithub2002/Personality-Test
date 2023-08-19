import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const authOption = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                const {mobile, password} = credentials;

                try{
                    await connectDB();
                    const user = await User.findOne({mobile});
                    if(!user){
                        throw new Error("User not found");
                        
                    }
                    const isValid = await bcrypt.compare(password, user.password);
                    if(!isValid){
                        throw new Error("Invalid Password");

                    }
                    
                    return user;
                }catch(err){
                    console.log(err)
                }
                
            }
        })
    ],
    session: {
        styartegy : 'jwt',

    },

    secret : process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/login',
    },

};

const handler = NextAuth(authOption);

export {handler as GET, handler as POST}
