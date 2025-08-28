import { useEffect, useRef, useState } from "react";
import s from "./BarSelector.module.scss";

interface BarSelectorProps {
  values: string[];
  onChange?: (value: string) => void;
  className?: string;
  fontSize?: number;
  itemWidth?: number;
}

export const BarSelector = ({
                              values,
                              onChange,
                              className,
                              fontSize,
                              itemWidth
                            }: BarSelectorProps) => {
  const [selected, setSelected] = useState(values[0]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = values.indexOf(selected);
    const el = itemsRef.current[index];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setSliderStyle({
        left: elRect.left - containerRect.left,
        width: elRect.width
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
        style={{ left: sliderStyle.left, width: sliderStyle.width }}
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
            fontSize: fontSize ? `${fontSize}px` : "inherit"
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};