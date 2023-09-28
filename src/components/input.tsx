import { useState } from "react";

interface InputProps {
  onChagneTodoList: (value: string) => void;
}

const Input = ({ onChagneTodoList }: InputProps) => {
  const [todo, setTodo] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // setTodo("");
            console.log(todo);
            onChagneTodoList(todo);
          }
        }}
        className="outline-none w-[200px] border-b border-[#ffffff] text-[32px] text-[#ffffff] text-center font-medium bg-transparent"
      />
    </div>
  );
};

export default Input;
