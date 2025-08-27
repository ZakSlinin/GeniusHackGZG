import s from "./index.module.scss";
import type { MetricsCardColor } from "../model/constants";

interface MetricsCardUIProps extends React.HTMLAttributes<HTMLDivElement> {
  background: MetricsCardColor;
  icon: React.ReactNode;
  textType?: "column" | "row";
  number: number | string;
  title: string;
}

export const MetricsCardUI = ({
  background,
  icon,
  textType = "row",
  number,
  title,
  className = "",
  ...props
}: MetricsCardUIProps) => {
  return (
    <div
      {...props}
      className={`${s.metricsCard} ${className}`}
      style={{ background }}
    >
      {icon}
      <div className={`${s[textType]}`}>
        <p>{number}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};
