import { useState, useRef } from "react";
import getRandomValue from "../utils/RandomValue";

interface ImageButtonProps {
  imageSrc: string;
  altText: string;
  hasEnergy: boolean;
  onClickCount?: (count: number) => void;
  onTouchCount?: (count: number) => void;
  className?: string;
  width?: string | number;
  height?: string | number;
}

interface PlusOne {
  id: number;
  x: number;
  y: number;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  imageSrc,
  altText,
  className,
  onClickCount,
  onTouchCount,
  hasEnergy,
  width,
  height,
}) => {
  const [plusOnes, setPlusOnes] = useState<PlusOne[]>([]);
  const activeTouchesRef = useRef<Set<number>>(new Set());

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (hasEnergy) {
      const { clientX, clientY } = event;

      // Create a "+1" element at the click position
      addPlusOne(clientX - 20, clientY - 10);

      if (onClickCount) onClickCount(1); // Since each click is 1 "+1"
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    const touches = event.touches;
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      if (!activeTouchesRef.current.has(touch.identifier)) {
        activeTouchesRef.current.add(touch.identifier);
      }
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (hasEnergy) {
      const touches = event.changedTouches;
      const touchCount = touches.length;

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        if (activeTouchesRef.current.has(touch.identifier)) {
          activeTouchesRef.current.delete(touch.identifier);
          addPlusOne(touch.clientX - 20, touch.clientY - 10, touchCount);
        }
      }
      if (onTouchCount) onTouchCount(touchCount);
    }
  };

  const addPlusOne = (x: number, y: number, count?: number) => {
    setPlusOnes((prev) => [
      ...prev,
      { id: getRandomValue(1, 100), x, y, count },
    ]);

    // Remove the "+1" after a short delay
    setTimeout(() => {
      setPlusOnes((prev) => prev.slice(1));
    }, 1000);
  };

  return (
    <div className="flex justify-center w-full p-[100px]">
      <button
        className={`${className} focus:outline-none`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={imageSrc}
          alt={altText}
          width={width}
          height={height}
          className={`block select-none ${
            hasEnergy
              ? "transform transition-transform duration-100 ease-in-out active:scale-95"
              : ""
          }`}
        />
      </button>

      {plusOnes.map((plusOne) => (
        <div
          key={plusOne.id}
          className="flex justify-center items-center magicpattern z-10 absolute text-black font-bold text-[30px] pointer-events-none animate-fadeUp"
          style={{
            width: 75,
            height: 75,
            left: plusOne.x,
            top: plusOne.y,
            transform: "translate(50%, 20%)",
          }}
        >
go        </div>
      ))}
    </div>
  );
};

export default ImageButton;
