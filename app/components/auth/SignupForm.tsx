"use client";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";

type SignupFormData = {
    email: string;
    password: string;
    passwordConfirm: string;
}

const SignupForm = () => {
    const {
        register, // input에 연결
        handleSubmit, // 폼 제출 핸들링
        formState: { errors }, // 에러 처리
        getValues // 입력 값 가져오기
    } = useForm<SignupFormData>();

    const handleSignup = (data: SignupFormData) => {
        console.log(data);
    };

    return (
        <form className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4" onSubmit={handleSubmit(handleSignup)}>
        <label htmlFor="email">이메일</label>
        <input 
            className="w-full p-2 border border-gray-300 rounded-md" type="email" id="email" placeholder="이메일을 입력해주세요." {...register("email",{
            required: "이메일을 입력해주세요.",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "이메일 형식에 맞지 않습니다.",
            },
        })}/>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password",{
                required: "비밀번호를 입력해주세요.",
                minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상 20자 이하이어야 합니다.",
                },
                maxLength:{
                    value: 20,
                    message: "비밀번호는 8자 이상 20자 이하이어야 합니다.",
                }
          })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register("passwordConfirm",{
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) => value === getValues("password") || "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}
        <Button type="submit">
          회원가입
        </Button>
      </form>
    )
}

export default SignupForm;