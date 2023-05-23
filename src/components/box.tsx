interface BoxProps {
  todoList: string[];
}

const Box = ({ todoList }: BoxProps) => {
  return (
    <div className="w-[300px] max-h-[300px] flex flex-col gap-y-[5px] p-[10px] rounded bg-[#ffffff] shadow-md">
      {todoList.map((todo, idx) => (
        <div key={idx} className="w-full py-[2px] px-[4px] bg-[#e1e1e1]">
          <p className="text-center text-[20px] text-[#424242] font-medium">
            {todo}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Box;
