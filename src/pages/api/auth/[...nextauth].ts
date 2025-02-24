
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { connectDatabase } from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcryptjs"

export const authOptions:AuthOptions = ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                Username: {label: "Username", type: "text"},
                Password: {label: "Password", type: "password"},
            },
            async authorize(credentials){
                await connectDatabase();
                
                const user = await Users.findOne({Username: credentials?.Username})
                if(!user){
                    throw new Error("No User Found")
                }

                const match = await bcrypt.compare(credentials?.Password || "", user.Password)

                if(!match){
                    throw new Error("Incorrect password");
                }

                return {
                    id: user._id,
                    name: user.Firstname
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid profile email",
                }
            },
            async profile(profile){
                await connectDatabase();

                const existingUser = await Users.findOne({Username: profile.email});

                if(!existingUser){
                    const newUser = new Users({
                        Firstname: profile.given_name,
                        Lastname: profile.family_name,
                        Username: profile.email,
                        Password: ""

                    })
                    await newUser.save();
                    
                    return {
                        id: newUser._id,
                        name: newUser.Firstname,
                        Username: newUser.Username,
                    };
                }

                return {
                    id: existingUser ?  existingUser._id : profile.email,
                    name: profile.given_name,
                    Username: profile.email,
                }
                
            }
        })

    ],
        callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id;
            }
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },

    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    debug: true,
})


export default NextAuth(authOptions);