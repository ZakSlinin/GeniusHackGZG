import s from "../index.module.scss";
import { BaseField } from "..";
import type { BaseFieldProps } from "../../model/types";

interface DateFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const InputDate = ({
  label,
  required = false,
  className = "",
  ...props
}: DateFieldProps) => {
  return (
    <BaseField label={label} required={required}>
      <input
        type="date"
        {...props}
        className={`${s.inputElement} ${className}`}
      />
    </BaseField>
  );
};
