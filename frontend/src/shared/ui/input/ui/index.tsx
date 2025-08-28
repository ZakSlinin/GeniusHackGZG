import s from "./index.module.scss";
import type { BaseFieldProps } from "../model/types";

interface BaseProps extends BaseFieldProps {
  children: React.ReactNode;
}

export const BaseField = ({
  label = "",
  required = false,
  className = "",
  children,
}: BaseProps) => {
  return (
    <div className={`${s.inputWrapper}`}>
      <label>
        {label}
        {required && "*"}
      </label>
      <div className={className}>{children}</div>
    </div>
  );
};
