import { Role } from "@/types/types";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  try {
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const demoUser = await prisma.user.findFirst({
      where: {
        role: Role.GUEST,
      },
    });

    if (!demoUser) {
      return NextResponse.json(
        { error: "Demo user not found" },
        { status: 404 }
      );
    }

    await prisma.userProgress.update({
      where: {
        userId: demoUser.id,
      },
      data: {
        currentGrade: 9,
        exp: 0,
        isMaster: false,
      },
    });

    if (!demoUser) {
      return NextResponse.json(
        { error: "Demo user not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Demo users reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to reset demo users" },
      { status: 500 }
    );
  }
}
