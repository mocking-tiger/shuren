import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * 서버 컴포넌트에서 사용하는 User API
 * Prisma를 직접 사용하여 데이터베이스에서 사용자 정보를 가져옴
 */
export const getServerUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProgress: true,
      },
      omit: {
        password: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
