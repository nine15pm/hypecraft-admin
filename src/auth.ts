import NextAuth from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';
import { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/types/User';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
    
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
   
            if (passwordsMatch) return user;
          }
   
          console.log('Invalid credentials');
          return null;
        },
      }),
    ],
    callbacks: {
      jwt({ trigger, token, user}) {
        if (trigger === "signIn") {
          token.first_name = user.first_name
          token.last_name = user.last_name
        }
        return token
      },
      async session({ session, token }) {
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name; //  Add role value to user object so it is passed along with session          
        return session;
      },
    },
  });

  
  declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
      first_name: string;
      last_name: string;
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
      first_name: string;
      last_name: string;
    }
  }