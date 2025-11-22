"use client";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("로그인");
  };

  const handleSignup = () => {
    console.log("회원가입");
  };

  return (
    <form className="w-[90%] md:w-[50%] mt-5 md:mt-20 mx-auto flex flex-col items-center justify-center gap-2 md:gap-4">
      <label htmlFor="email">이메일</label>
      <Input type="email" id="email" placeholder="이메일을 입력해주세요." />
      <label htmlFor="password">비밀번호</label>
      <Input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <Button type="submit" onClick={(e) => handleLogin(e)}>
        로그인
      </Button>
      <Button type="button" onClick={handleSignup}>
        회원가입
      </Button>
    </form>
  );
};

export default LoginForm;
