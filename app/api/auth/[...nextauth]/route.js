import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOption = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials;

                try{
                    await connectDB();
                    const user = await User.findOne({email});
                    if(!user){
                        return null;
                        
                    }
                    const isValid = await bcrypt.compare(password, user.password);
                    if(!isValid){
                        return null;

                    }
                    
                    return user;
                }catch(err){
                    console.log(err)
                }
                
            }
        })
    ],

    callbacks: {
        async jwt ({token, user, }) {
            if(user){
                return {
                    ...token,
                    id: user._id,
                }
            };
            return token;
        },
        async session({session, token}){
           
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        }
    },
    session: {
        strategy : 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },

    secret : process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/login',
    },

};

const handler = NextAuth(authOption);

export {handler as GET, handler as POST}
