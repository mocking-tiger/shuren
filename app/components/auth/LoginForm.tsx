"use client";

import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register, // input에 연결
    handleSubmit, // 폼 제출 핸들링
    formState: { errors, isSubmitting }, // 폼 제출 상태 관리
  } = useForm<LoginFormData>();
  const [error, setError] = useState("");

  const handleLogin = async (data: LoginFormData) => {
    try {
      setError("");

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        // 로그인 실패
        setError(response.error);
      } else {
        // 로그인 성공
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("로그인 에러:", e);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <form
      className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      {error && <p className="text-red-500">{error}</p>}

      <label htmlFor="email">이메일</label>
      <Input
        type="email"
        id="email"
        placeholder="이메일을 입력해주세요."
        {...register("email", { required: "이메일을 입력해주세요." })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <label htmlFor="password">비밀번호</label>
      <Input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        {...register("password", { required: "비밀번호를 입력해주세요." })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "bg-gray-300" : ""}`}
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
      <Link href="/signup" className="w-full">
        <Button type="button">회원가입</Button>
      </Link>
    </form>
  );
};

export default LoginForm;
