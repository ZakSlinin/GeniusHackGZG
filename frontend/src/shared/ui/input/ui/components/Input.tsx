import s from "../index.module.scss";
import { BaseField } from "..";
import type { BaseFieldProps } from "../../model/types";

interface TextFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({
  label,
  required = false,
  className = "",
  ...props
}: TextFieldProps) => {
  return (
    <BaseField label={label} required={required}>
      <input {...props} className={`${s.inputElement} ${className}`} />
    </BaseField>
  );
};
