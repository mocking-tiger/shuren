"use client";

import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUserProgress } from "@/lib/api/user-progress-api";
import { useForm } from "react-hook-form";

type ProfileFormData = {
  name: string;
  password: string;
  passwordConfirm: string;
};

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const {
    data: userProgress,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProgress"],
    queryFn: getUserProgress,
    enabled: status === "authenticated",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ProfileFormData>();

  const handleSaveProfile = async () => {};

  console.log(session);
  console.log(userProgress);
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSaveProfile)}
        className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4"
      >
        <label htmlFor="name">이름</label>
        <Input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          {...register("name", { required: "이름을 입력해주세요." })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register("passwordConfirm", {
            required: "비밀번호를 다시 입력해주세요.",
            validate: (value) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
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
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
