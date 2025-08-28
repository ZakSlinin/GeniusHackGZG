import s from "../index.module.scss";
import { BaseField } from "../";
import type { BaseFieldProps } from "../../model/types";
import React from "react";

interface TextareaFieldProps
  extends BaseFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, required = false, className = "", ...props }, ref) => {
  return (
    <BaseField label={label} required={required}>
      <textarea
        ref={ref}
        {...props}
        className={`${s.inputElement} ${className}`}
      />
    </BaseField>
  );
});
Textarea.displayName = "Textarea";
