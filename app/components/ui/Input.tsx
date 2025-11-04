interface InputProps {
  type: string;
  id: string;
  placeholder: string;
}

const Input = ({ type, id, placeholder }: InputProps) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  );
};

export default Input;
