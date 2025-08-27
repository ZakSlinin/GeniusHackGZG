import s from "../index.module.scss";
import { BaseField } from "..";
import type { BaseFieldProps } from "../../model/types";

interface DateFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const InputTime = ({
                            label,
                            required = false,
                            className = "",
                            ...props
                          }: DateFieldProps) => {
  return (
    <BaseField label={label} required={required}>
      <input
        type="time"
        {...props}
        className={`${s.inputElement} ${className}`}
      />
    </BaseField>
  );
};
