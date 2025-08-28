import { useEffect, useRef, useState } from "react";
import s from "./BarSelector.module.scss";

interface BarSelectorProps {
  values: string[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  fontSize?: number;
  itemWidth?: number;
}

export const BarSelector = ({
  values,
  value,
  onChange,
  className,
  fontSize,
  itemWidth,
}: BarSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // если value передан → контролируем индекс
  useEffect(() => {
    if (value !== undefined) {
      const idx = values.indexOf(value);
      if (idx !== -1) {
        setSelectedIndex(idx);
      }
    }
  }, [value, values]);

  useEffect(() => {
    const container = containerRef.current;
    const currentButton = itemsRef.current[selectedIndex];

    if (itemWidth !== undefined) {
      setSliderStyle({ left: selectedIndex * itemWidth, width: itemWidth });
      return;
    }

    if (container && currentButton) {
      const elRect = currentButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setSliderStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width,
      });
    }
  }, [selectedIndex, itemWidth, values.length]);

  const handleClick = (index: number) => {
    if (value === undefined) {
      // uncontrolled режим
      setSelectedIndex(index);
    }
    onChange?.(values[index]); // всегда дергаем onChange
  };

  return (
    <div className={`${s.container} ${className || ""}`} ref={containerRef}>
      <div
        className={s.slider}
        style={{ left: sliderStyle.left, width: sliderStyle.width }}
      />
      {values.map((item, idx) => (
        <button
          key={item}
          type="button"
          ref={(el: HTMLButtonElement | null) => {
            itemsRef.current[idx] = el;
          }}
          onClick={() => handleClick(idx)}
          className={`${s.item} ${selectedIndex === idx ? s.active : ""}`}
          style={{
            width: itemWidth !== undefined ? `${itemWidth}px` : undefined,
            fontSize: fontSize ? `${fontSize}px` : undefined,
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
