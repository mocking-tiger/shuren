import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { grade, step, isPromotion } = await request.json();
    return NextResponse.json({ grade, step, isPromotion }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "단어 조회에 실패했습니다.\n 관리자에게 문의해주세요." },
      { status: 500 }
    );
  }
}
