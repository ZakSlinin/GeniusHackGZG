import { useEffect, useRef, useState } from "react";
import s from "./BarSelector.module.scss";

interface BarSelectorProps {
  values: string[];
  onChange?: (value: string) => void;
  className?: string;
  fontSize?: number;
  itemWidth?: number;
  itemHeight?: number;
}

export const BarSelector = ({
                              values,
                              onChange,
                              className,
                              fontSize,
                              itemWidth,
                              itemHeight
                            }: BarSelectorProps) => {
  const [selected, setSelected] = useState(values[0]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = values.indexOf(selected);
    const el = itemsRef.current[index];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const isVertical = window.innerWidth <= 768;
      setSliderStyle({
        left: isVertical ? 4 : elRect.left - containerRect.left,
        width: isVertical ? containerRect.width - 8 : elRect.width,
        top: isVertical ? elRect.top - containerRect.top : 4,
        height: isVertical ? elRect.height : containerRect.height - 8
      });
    }
  }, [selected, values]);

  const handleClick = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className={`${s.container} ${className || ""}`} ref={containerRef}>
      <div
        className={s.slider}
        style={{
          left: sliderStyle.left,
          width: sliderStyle.width,
          top: sliderStyle.top,
          height: sliderStyle.height
        }}
      />
      {values.map((item, idx) => (
        <button
          key={item}
          type="button"
          ref={(el: HTMLButtonElement | null) => (itemsRef.current[idx] = el)}
          onClick={() => handleClick(item)}
          className={`${s.item} ${selected === item ? s.active : ""}`}
          style={{
            width: itemWidth !== undefined ? `${itemWidth}px` : "auto",
            height: itemHeight !== undefined ? `${itemHeight}px` : "auto",
            fontSize: fontSize ? `${fontSize}px` : "inherit"
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};