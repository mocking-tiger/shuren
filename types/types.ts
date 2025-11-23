// ================================================
// Enum
// ================================================
export enum Role {
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
// 테이블 인터페이스
// ================================================
export interface User {
    id: number;

    email: string;
    name: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;

    userProgress: UserProgress;
}

export interface UserProgress {
    id: number;

    currentGrade: number;
    exp: number;
    isMaster: boolean;

    userId: number;
    user: User;
}