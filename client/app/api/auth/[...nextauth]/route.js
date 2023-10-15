import NextAuth from 'next-auth'
// import initialiseDB from '@app/utils/database'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import axios from 'axios'

let rememberPassword

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'example@gmail.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        rememberPassword = req.body.rememberMe

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await axios.post('http://localhost:5000/user/login', {
          username: credentials?.username,
          password: credentials?.password
        })

        const user = await res.data

        // If no error and we have user data, return it
        if (user) {
          return user
        } else {
          // Return null if user data could not be retrieved
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0'
    })
  ],
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      // the token contains the user's access token, _id and email or username for credentails login
      if (account && profile) {
        token.accessToken = account.access_token
        token.id = profile.id
      } // the token contains the OAuth access token and id for OAuth login
      return token
    },

    session: async ({ session, token }) => {
      session.user = token

      return session
    }
  },
  pages: {
    signIn: '/'
  },
  session: {
    maxAge: rememberPassword ? 24 * 60 * 60 * 30 : 24 * 60 * 60
  }
})

export { handler as GET, handler as POST }
