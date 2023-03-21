import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./../../../backend/models/userModel";
import connectToDb from "./../../../backend/connectToDb";

const cookiePrefix = process.env.NEXT_PUBLIC_COOKIE_PREFIX;
const useSecureCookies = process.env.NODE_ENV === "production" ? true : false;

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connectToDb();

        //1. check credentials for body data
        const { mobile, password } = credentials;

        console.log(credentials);
        if (!mobile || !password) {
          throw new Error("Incomplete details");
        }

        // 2. init user and check if user exists in DB
        let user;

        // get user from DB
        try {
          user = await User.findOne({
            mobile,
          }).select("+password");
          if (!user) {
            throw new Error("User not found!");
          }
        } catch (error) {
          throw new Error(error);
        }

        //3) Verify user Password
        if (!(await user.correctPassword(password, user.password))) {
          throw new Error("Incorrect password");
        }

        if (user.suspended) {
          throw new Error("Account has been suspended!");
        }

        // remove user password from response
        user.password = undefined;
        return user;
      },
    }),
  ],
  secret: process.env.COOKIE_SECRET,
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
  callbacks: {
    async signIn({}) {
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}__Secure-next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `${cookiePrefix}__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/500",
  },
  debug: false,
};

export default NextAuth(authOptions);
