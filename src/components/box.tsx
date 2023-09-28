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

const boundaryMargin = 12;

const inRange = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

const Box = ({ todoList }: BoxProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxNavRef = useRef<HTMLDivElement | null>(null);

  const cachedPointer = useLoadLocalStorage<IMovePointer>({
    key: localStorageKey,
  }) || {
    x: 0,
    y: 0,
  };

  const [{ x, y }, setPosition] = useState<IMovePointer>({
    x: cachedPointer.x,
    y: cachedPointer.y,
  });

  useSetLocalStorage({
    key: localStorageKey,
    data: { x, y },
    defaultData: { x, y },
  });

  return (
    <>
      <div
        ref={boxRef}
        style={{
          // transform: `translateX(${x}px) translateY(${y}px)`,
          left: x,
          top: y,
        }}
        className="absolute w-[300px] flex flex-col rounded"
      >
        <div
          ref={boxNavRef}
          role="nav"
          className="cursor-move w-full h-[25px] flex items-center gap-x-[5px] px-[10px] bg-[#4a4a4a] rounded-t"
          onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
            const mouseMoveHandler = (moveEvent: MouseEvent) => {
              const deltaX = moveEvent.screenX - clickEvent.screenX;
              const deltaY = moveEvent.screenY - clickEvent.screenY;

              setPosition({
                x: inRange(
                  x + deltaX,
                  boundaryMargin,
                  window.innerWidth - 300 - boundaryMargin
                ),
                y: inRange(
                  y + deltaY,
                  boundaryMargin,
                  window.innerHeight - 325 - boundaryMargin
                ),
              });
            };

            const mouseUpHandler = () => {
              document.removeEventListener("mousemove", mouseMoveHandler);
            };

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler, {
              once: true,
            });
          }}
        ></div>
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
