import LoginForm from "./components/auth/LoginForm";

export default function Home() {
  return (
    <div>
      <h1 className="mt-20 text-[30px] md:text-[50px] 2xl:text-[100px] text-center font-yuji">
        Shuren - 修錬
      </h1>
      <h2 className="text-[20px] md:text-[40px] 2xl:text-[80px] text-center font-yuji">形容詞</h2>
      <h3 className="text-[20px] 2xl:text-[40px] text-center font-gowun">일본어 형용사 학습</h3>
      <LoginForm />
    </div>
  );
}
