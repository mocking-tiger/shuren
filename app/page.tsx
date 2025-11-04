import LoginForm from "./components/auth/LoginForm";

export default function Home() {
  return (
    <div>
      <h1 className="mt-20 text-[100px] text-center font-yuji">
        Shuren - 修錬
      </h1>
      <LoginForm />
    </div>
  );
}
