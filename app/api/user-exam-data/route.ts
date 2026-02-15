import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { grade, step, isPromotion } = body;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }
    const userId = Number(session.user.id);

    await prisma.userExamData.upsert({
      where: { userId },
      update: { grade, step, isPromotion },
      create: { userId, grade, step, isPromotion },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "사용자 시험 데이터 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 },
      );
    }
    const userId = Number(session.user.id);
    const userExamData = await prisma.userExamData.findUnique({
      where: { userId },
    });
    return NextResponse.json(userExamData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "사용자 시험 데이터 조회에 실패했습니다." },
      { status: 500 },
    );
  }
}
