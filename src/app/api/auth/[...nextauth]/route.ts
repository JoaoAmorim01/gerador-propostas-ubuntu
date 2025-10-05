import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('--- AUTORIZANDO LOGIN ---');
        console.log('Email recebido:', credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log('Credenciais ausentes.');
          return null;
        }

        // 1. Buscar o usuário no banco de dados
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          console.error('ERRO: Usuário não encontrado no Supabase.', error);
          return null;
        }

        console.log('Usuário encontrado:', user.email);

        // 2. Comparar a senha
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log('A senha está correta?', isPasswordCorrect);

        if (isPasswordCorrect) {
          console.log('Login bem-sucedido!');
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        console.log('ERRO: Senha incorreta.');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };