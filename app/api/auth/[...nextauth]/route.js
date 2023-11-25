import User from "@/models/UserSchema";
import { connectDB } from "@/utils/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
        },
        async signIn({ user, account, profile }) {
            if (account.provider === 'google') {
                await connectDB();
              // Check if user exists in your database
                let userExists = await User.findOne({ email: user.email });
              
                if (!userExists) {
                    // Create new user if doesn't exist
                    userExists = await User.create({
                    name: user.name,
                    email: user.email,
                    
                    });
                }
      
              return true; // Continue the sign-in process
            }
            return false; // Don't sign in if not Google provider
        },
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
