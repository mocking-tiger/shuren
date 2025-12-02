interface ButtonProps {
  type: "submit" | "button" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type,
  onClick,
  children,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full p-2 border bg-black text-white rounded-md cursor-pointer ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
