import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const body = await request.json();
    const { examInfo } = body;

    // 클라이언트 값 대신 DB에서 직접 조회
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!userProgress) {
      return NextResponse.json(
        { error: "진행 데이터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

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
        where: { userId },
        data: {
          currentGrade: examInfo.grade === 1 ? 1 : examInfo.grade - 1,
          exp: examInfo.grade === 1 ? 3 : 0,
          isMaster: examInfo.grade === 1 ? true : false,
        },
      });
    } else {
      await prisma.userProgress.update({
        where: { userId },
        data: {
          exp: userProgress.exp === 0 ? 1 : userProgress.exp === 1 ? 2 : 3,
        },
      });
    }

    revalidatePath("/dashboard", "layout");
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "프로그레스 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}
