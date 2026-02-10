import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// word 테이블은 143개 레코드의 정적 데이터이므로 매번 DB 조회할 필요 없음
// 첫 요청 시에만 DB 조회하고 이후에는 메모리에서 반환
let meaningsCache: string[] | null = null;

export async function GET() {
  try {
    // 캐시가 있으면 바로 반환 (DB 조회 생략)
    if (meaningsCache) {
      return NextResponse.json(meaningsCache, { status: 200 });
    }

    // [기존 코드] 매번 DB에서 모든 단어를 조회하여 중복 제거
    // 문제점: 정적 데이터를 매 요청마다 DB에서 조회 (불필요한 오버헤드)
    // const words = await prisma.word.findMany({
    //   select: {
    //     wordMeaning: true,
    //   },
    // });
    // const uniqueMeanings = [...new Set(words.map((word) => word.wordMeaning))];
    // return NextResponse.json(uniqueMeanings, { status: 200 });

    // [개선 코드] 처음 한 번만 DB 조회 후 메모리에 캐싱
    const words = await prisma.word.findMany({
      select: {
        wordMeaning: true,
      },
    });

    // 중복 제거 후 캐시에 저장
    meaningsCache = [...new Set(words.map((word) => word.wordMeaning))];

    return NextResponse.json(meaningsCache, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "단어 뜻 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 },
    );
  }
}
