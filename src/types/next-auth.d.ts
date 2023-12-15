/* eslint unused-imports/no-unused-imports: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface User {
  name: string;
  email: string;
  account: string;
  token: string;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    Session: Session;
  }
}
