import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const oldProgress = await request.json();
    const isPromotion = oldProgress.isPromotion;
    if (isPromotion) {
      await prisma.userProgress.update({
        where: { id: oldProgress.id },
        data: {
          currentGrade: oldProgress.currentGrade - 1,
          exp: 0,
          isMaster: oldProgress.currentGrade === 1 ? true : false,
        },
      });
    } else {
      await prisma.userProgress.update({
        where: { id: oldProgress.id },
        data: {
          exp: oldProgress.exp === 0 ? 1 : oldProgress.exp === 1 ? 2 : 3,
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
