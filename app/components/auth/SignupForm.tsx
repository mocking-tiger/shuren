"use client";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { apiPost } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/types/types";

type SignupFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const router = useRouter();
  const {
    register, // input에 연결
    handleSubmit, // 폼 제출 핸들링
    formState: { errors, isSubmitting }, // 폼 제출 상태 관리
    getValues, // 입력 값 가져오기
  } = useForm<SignupFormData>();

  const handleSignup = async (data: SignupFormData) => {
    const { email, password } = data;
    const loadingToast = toast.loading("입회식을 진행하고 있습니다...");
    try {
      const response = await apiPost("/signup", { email, password });

      if (!response || !response.data) {
        console.error("handleSignup 에러");
        return;
      }

      toast.success("입회식이 완료되었습니다.\n 수련을 시작해보세요.");
      router.push("/");
    } catch (e) {
      const error = e as ErrorResponse;
      toast.error(error.response.data.error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form
      className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4"
      onSubmit={handleSubmit(handleSignup)}
    >
      <label htmlFor="email">이메일</label>
      <Input
        type="email"
        id="email"
        placeholder="이메일을 입력해주세요."
        {...register("email", {
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <label htmlFor="password">비밀번호</label>
      <Input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
          minLength: {
            value: 4,
            message: "비밀번호는 4자 이상 20자 이하이어야 합니다.",
          },
          maxLength: {
            value: 20,
            message: "비밀번호는 4자 이상 20자 이하이어야 합니다.",
          },
        })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <label htmlFor="passwordConfirm">비밀번호 확인</label>
      <Input
        type="password"
        id="passwordConfirm"
        placeholder="비밀번호를 다시 입력해주세요."
        {...register("passwordConfirm", {
          required: "비밀번호를 다시 입력해주세요.",
          validate: (value) =>
            value === getValues("password") || "비밀번호가 일치하지 않습니다.",
        })}
      />
      {errors.passwordConfirm && (
        <p className="text-red-500">{errors.passwordConfirm.message}</p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "bg-gray-300" : ""}`}
      >
        {isSubmitting ? "심사 중..." : "등록"}
      </Button>
    </form>
  );
};

export default SignupForm;
