import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    const userId = Number(session.user.id);
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!userProgress) {
      return NextResponse.json(
        { error: "사용자 진도 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return NextResponse.json(userProgress, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "사용자 진도 정보 조회 실패." },
      { status: 500 }
    );
  }
}
