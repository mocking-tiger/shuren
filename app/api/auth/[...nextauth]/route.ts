import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth"; // 인증 설정을 받아서 handler 생성
import CredentialsProvider from "next-auth/providers/credentials"; // 이메일/비밀번호 인증 Provider - NextAuth가 제공하는 여러 Provider 중 하나
import { PrismaClient } from "@prisma/client"; // DB 접근용

const prisma = new PrismaClient();

// GET, POST 요청을 처리 함수
export const authOptions: NextAuthOptions = {
  // 인증 방법들의 배열 - 여러 Provider 추가 가능
  providers: [
    // 이메일/비밀번호 인증 Provider
    CredentialsProvider({
      name: "Credentials",
      // 인증 정보 입력 폼 필드 정의
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // 인증 정보 검증 함수
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("존재하지 않는 이메일입니다.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  // 인증 페이지 경로 설정
  pages: {
    signIn: "/", // 로그인 필요 시 여기로 리다이렉트
  },
  // 세션 저장 방식 선택
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24시간
    updateAge: 60 * 60, // 1시간
  },
  callbacks: {
    // jwt 토큰 생성/갱신 시 실행
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // 클라이언트에 전달할 세션 객체 생성(프론트엔드에서 useSession() 호출 시)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
