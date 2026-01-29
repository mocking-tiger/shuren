import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userProgress, examInfo } = body;

    if (userProgress.currentGrade < examInfo.grade) {
      return NextResponse.json(
        { message: "이미 클리어 한 단계니까 업데이트 안할게" },
        { status: 200 }
      );
    } else if (userProgress.currentGrade > examInfo.grade) {
      return NextResponse.json(
        { message: "잘못된 접근이니까 업데이트 안할게" },
        { status: 200 }
      );
    } else if (!examInfo.isPromotion && userProgress.exp >= examInfo.step) {
      return NextResponse.json(
        { message: "이미 클리어 한 단계니까 업데이트 안할게" },
        { status: 200 }
      );
    }

    if (examInfo.isPromotion) {
      await prisma.userProgress.update({
        where: { id: userProgress.id },
        data: {
          currentGrade: examInfo.grade === 1 ? 1 : examInfo.grade - 1,
          exp: examInfo.grade === 1 ? 3 : 0,  // 승급 후 처음부터 시작 (1급 마스터는 예외)
          isMaster: examInfo.grade === 1 ? true : false,
        },
      });
    } else {
      await prisma.userProgress.update({
        where: { id: userProgress.id },
        data: {
          exp: userProgress.exp === 0 ? 1 : userProgress.exp === 1 ? 2 : 3,
        },
      });
    }
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "프로그레스 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}
