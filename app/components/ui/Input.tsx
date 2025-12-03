import { forwardRef } from "react"; // 부모 컴포넌트에서 자식의 ref에 접근하기 위해 사용

type InputProps = React.InputHTMLAttributes<HTMLInputElement>; // input의 속성을 모두 사용할 수 있게

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  );
});

Input.displayName = "Input"; // React Dev Tools에서 표시되는 이름(없으면 FowardRef라고만 나와서 구분하기 어려움)

export default Input;
