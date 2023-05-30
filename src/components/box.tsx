import { useRef, useState } from "react";

import { useSetLocalStorage, useLoadLocalStorage } from "../hooks";

interface BoxProps {
  todoList: string[];
}

interface IMovePointer {
  x: number;
  y: number;
}

const localStorageKey = "todoStickyNotePointer";

const Box = ({ todoList }: BoxProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxNavRef = useRef<HTMLDivElement | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [shiftPointer, setShiftPointer] = useState({
    x: 0,
    y: 0,
  });

  const cachedPointer = useLoadLocalStorage<IMovePointer>({
    key: localStorageKey,
  }) || {
    x: 0,
    y: 0,
  };

  const [movePointer, setMovePointer] = useState<IMovePointer>({
    x: cachedPointer.x,
    y: cachedPointer.y,
  });

  useSetLocalStorage({
    key: localStorageKey,
    data: movePointer,
    defaultData: movePointer,
  });

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setIsMouseDown(false);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setIsMouseDown(true);
    if (boxRef.current) {
      const { clientX, clientY } = e;
      const { left, top } = boxRef.current?.getBoundingClientRect();

      setShiftPointer({
        x: clientX - left,
        y: clientY - top,
      });
    }
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e;

    if (isMouseDown) {
      setMovePointer({
        x: clientX - shiftPointer.x,
        y: clientY - shiftPointer.y,
      });
    }
  };

  return (
    <>
      <div
        ref={boxRef}
        style={{
          left: movePointer.x,
          top: movePointer.y,
        }}
        className="absolute w-[300px] flex flex-col rounded"
      >
        <div
          ref={boxNavRef}
          role="nav"
          className="cursor-move w-full h-[25px] flex items-center gap-x-[5px] px-[10px] bg-[#4a4a4a]"
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
        >
          <div className="cursor-pointer w-[12px] h-[12px] rounded-full bg-[#FF605C]" />
          <div className="cursor-pointer w-[12px] h-[12px] rounded-full bg-[#FFBD44]" />
          <div className="cursor-pointer w-[12px] h-[12px] rounded-full bg-[#00CA4E]" />
        </div>
        <div className="h-[300px] flex flex-col bg-[#f2f2f2] gap-y-[10px]">
          {todoList.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-[20px] font-bold">Empty</p>
              <p className="text-[14px] font-medium text-[#4a4a4a]">
                Anything to do?
              </p>
            </div>
          )}
          {todoList.map((todo, idx) => (
            <div
              key={idx}
              className="cursor-pointer w-full flex items-center gap-x-[10px] bg-[#ffffff] hover:shadow-md"
            >
              <div className="w-[5px] h-full bg-indigo-400" />
              <p className="text-[18px] text-[#424242] py-[8px] font-medium">
                {todo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Box;
