"use client";

import toast from "react-hot-toast";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import ProgressBar from "../components/ProgressBar";
import LoadingComponent from "@/app/components/ui/Loading";
import { useEffect, useState } from "react";
import { Role, ExamData } from "@/types/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/api/user-api";
import { useUserData } from "@/hooks/use-user-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ProfileFormData = {
  name: string;
  password: string;
  passwordConfirm: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userData } = useUserData();
  const [examData] = useState<ExamData | null>(() => {
    if (typeof window === "undefined") return null;
    const data = sessionStorage.getItem("examData");
    return data ? JSON.parse(data) : null;
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (userData && userData.name) {
      reset({
        name: userData.name,
      });
    }
  }, [userData, reset]);

  // useMutation(데이터 변경)
  const mutation = useMutation({
    // 데이터 변경 함수
    mutationFn: updateUser,
    // 데이터 변경 성공 시
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] }); // 캐시 무효화
      toast.success("프로필이 수정되었습니다.");
      router.push("/dashboard");
    },
    // 데이터 변경 실패 시
    onError: () => {
      toast.error("프로필 수정에 실패했습니다.");
    },
  });

  const handleSaveProfile = async (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  const handleSetPromotionExam = () => {
    if (!examData) return;

    sessionStorage.setItem(
      "examData",
      JSON.stringify({
        grade: examData.grade,
        step: examData.step,
        isPromotion: true,
      })
    );
    router.push("/dashboard/exam");
  };

  if (!userData) return <LoadingComponent />;

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
          placeholder="이름을 입력해주세요(최대 10자)."
          {...register("name", { required: "이름을 입력해주세요." })}
          maxLength={10}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label htmlFor="password">비밀번호</label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요(최대 20자)."
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          maxLength={20}
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
          maxLength={20}
        />
        {errors.passwordConfirm && (
          <p className="text-red-500">{errors.passwordConfirm.message}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || userData.role === Role.GUEST}
          className={`${isSubmitting ? "bg-gray-300" : ""}`}
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
        {userData.role === Role.GUEST && (
          <span className="text-red-500">
            체험용 계정은 프로필 수정이 불가능합니다.
          </span>
        )}
      </form>
      <div className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4">
        {userData?.userProgress && (
          <ProgressBar
            userProgress={userData.userProgress}
            isPlayAnimation={false}
          />
        )}
        {examData &&
          userData.userProgress.currentGrade === examData.grade &&
          userData.userProgress.exp === 3 &&
          !userData.userProgress.isMaster && (
            <Button
              type="button"
              className="w-20! mt-4"
              onClick={handleSetPromotionExam}
            >
              승급시험
            </Button>
          )}
      </div>
    </div>
  );
};

export default ProfilePage;
