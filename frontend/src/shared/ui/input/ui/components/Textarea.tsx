import s from "../index.module.scss";
import { BaseField } from "../";
import type { BaseFieldProps } from "../../model/types";

interface TextareaFieldProps
  extends BaseFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({
  label,
  required = false,
  className = "",
  ...props
}: TextareaFieldProps) => {
  return (
    <BaseField label={label} required={required}>
      <textarea {...props} className={`${s.inputElement} ${className}`} />
    </BaseField>
  );
};
