import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      select: {
        wordMeaning: true,
      },
    });

    // 중복 제거
    const uniqueMeanings = [...new Set(words.map((word) => word.wordMeaning))];

    return NextResponse.json(uniqueMeanings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "단어 뜻 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
