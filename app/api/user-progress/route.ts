import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId: Number(userId),
      },
    });
    return NextResponse.json(userProgress, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "사용자 진도 정보 조회 실패." },
      { status: 500 }
    );
  }
}
