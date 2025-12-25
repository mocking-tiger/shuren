import { prisma } from "@/lib/prisma";
import { getWordRange } from "@/lib/utils/word-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ grade: string }> }
) {
  try {
    const { grade } = await params;
    const { skip, take } = getWordRange(Number(grade));

    const words = await prisma.word.findMany({
      skip,
      take,
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(words);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "단어 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
