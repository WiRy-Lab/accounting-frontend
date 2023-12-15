import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const { API_URL } = process.env;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        account: { label: 'Account', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const auth = await axios.post(`${API_URL}/auth/login`, {
          ...credentials,
        });

        if (auth.status !== 200) {
          return null;
        }

        const user = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Token ${auth.data.token}`,
          },
        });

        if (user.status !== 200) {
          return null;
        }

        const userData = {
          ...user.data,
          token: auth.data.token,
        };

        return userData;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // / Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.

      return {
        ...session,
        user: {
          ...token,
        },
      };
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
});
