interface ButtonProps {
  type: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full p-2 border bg-black text-white rounded-md cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
