import { prisma } from "@/lib/prisma";
import { Word } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { grade, step, isPromotion } = await request.json();

    let words: Word[] = [];

    if (isPromotion) {
      words = await prisma.word.findMany({
        skip: (9 - grade) * 27,
        take: 27,
      });
    } else {
      words = await prisma.word.findMany({
        skip: (9 - grade) * 27 + (step - 1) * 9,
        take: 9,
      });
    }
    return NextResponse.json(words, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "단어 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
