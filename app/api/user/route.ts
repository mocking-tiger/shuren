import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProgress: true,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "프로필 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    const userId = Number(session.user.id);
    const { name, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, password: hashedPassword },
      omit: {
        password: true,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "프로필 수정에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
