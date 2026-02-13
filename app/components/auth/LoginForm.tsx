"use client";

import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import LoadingComponent from "../ui/Loading";
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
    formState: { errors }, // 폼 에러 관리
  } = useForm<LoginFormData>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    try {
      setError("");
      setIsLoading(true);

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        // 로그인 실패
        setError(response.error);
        setIsLoading(false);
      } else {
        // 로그인 성공
        router.push("/dashboard");
      }
    } catch (e) {
      console.error("로그인 에러:", e);
      setError("로그인 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-[90%] md:w-[50%] 2xl:w-[30%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      {error && (
        <p className="text-red-500">
          {error.includes("max clients")
            ? "데이터 베이스 무료티어 할당량을 초과했습니다. 열심히 일해서 꼭 유료플랜 업그레이드 하겠습니다."
            : error}
        </p>
      )}

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
        disabled={isLoading}
        className={`${isLoading ? "bg-gray-300" : ""}`}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      <Link href="/signup" className="w-full">
        <Button type="button">회원가입</Button>
      </Link>
      <Button
        type="button"
        className="w-full bg-green-500 font-bold"
        onClick={() =>
          handleLogin({ email: "demo@gmail.com", password: "1234" })
        }
        disabled={isLoading}
      >
        체험용 계정으로 로그인
      </Button>
      {isLoading && <LoadingComponent />}
    </form>
  );
};

export default LoginForm;
