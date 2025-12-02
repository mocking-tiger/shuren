import bcrypt from "bcrypt";
import { Role } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 입력값 유효성 검사
    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 중복 검사
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 존재하는 이메일입니다." },
        { status: 409 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          name: "",
          password: hashedPassword,
          role: Role.USER,
        },
      });

      await tx.userProgress.create({
        data: {
          userId: user.id,
        },
      });

      const userWithName = await tx.user.update({
        where: { id: user.id },
        data: {
          name: `신입 ${user.id}`,
        },
        omit: {
          password: true,
        },
      });

      return userWithName;
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "회원가입에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
