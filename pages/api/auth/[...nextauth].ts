import { dbUsers } from "@/database";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    Credentials({
      name:'Custom Login',
      credentials:{
        email:{label:'Correo:',type:'email',placeholder:'correo@google.com'},
        password:{label:'Contraseña:',type:'password',placeholder:'Contraseña'},
      },
      async authorize(credentials){

        console.log({credentials});
        //TODO: validar contra base de datos
        // return {name:'Juan',correo:'Juan@google.com',role:'admin'};
        return await dbUsers.checkUserEmailPassword(credentials!.email,credentials!.password);
      }
    })
  ],
  //Custom Page
  pages:{
    signIn:'/auth/login',
    newUser:'/auth/register'
  },

  //Callbacks
  jwt:{
    
  },
  session:{
    maxAge:2593000,
    strategy:'jwt',
    updateAge:86400, //Cada dia

  },

  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
            token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },


    async session({ session, token, user }){
      // console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }
    

  }
}

export default NextAuth(authOptions)