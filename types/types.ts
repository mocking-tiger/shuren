import { Word } from "@prisma/client";

// ================================================
// Enum
// ================================================
export enum Role {
  GUEST = 0,
  USER = 1,
  ADMIN = 10,
}

export enum Level {
  N1 = "N1",
  N2 = "N2",
  N3 = "N3",
  N4 = "N4",
  N5 = "N5",
}

// ================================================
// API 응답 인터페이스
// ================================================
export interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
}

// ================================================
// 프론트엔드 인터페이스
// ================================================
export interface ExamData {
  grade: number;
  step: number;
  isPromotion: boolean;
}

export interface WordWithChoice extends Word {
  choice: string[];
}
