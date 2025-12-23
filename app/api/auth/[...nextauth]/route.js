import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import User from "@/app/models/Users"
// import payments from "@/models/payments"
import mongoose from "mongoose"
import connectDB from "@/app/db/connectDb"
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
       authorization: { params: { scope: "read:user user:email" } },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(credentials)
      if (account.provider === "github") {
        await connectDB()
        const existingUser =await User.findOne({ email: email })
        console.log(user)
        if (!existingUser) {
          const newUser = new User({
             email: user.email,
            name: user.name || profile?.name || profile?.login,
            username: profile?.login || user.name?.replace(/\s+/g, '').toLowerCase(),
            profilepic: user.image,
            coverpic:`https://i.pinimg.com/736x/3e/ac/61/3eac61d20e5d16ea9356bc025d24c113.jpg`,
           
          })
          await newUser.save()
           console.log("New user created:", newUser.email);
          // User.name = newUser.username
        }
      }
      else{
        console.log("Existing user found:", existingUser.email);
        // User.name = existingUser.username
      }
      return true
    }
  },
  // async session({ session, token }) {
  //     if (session.user) {
  //       session.user.id = token.sub;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   }
})

export { handler as GET, handler as POST }