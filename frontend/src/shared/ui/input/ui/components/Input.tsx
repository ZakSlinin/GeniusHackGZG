import s from "../index.module.scss";
import { BaseField } from "..";
import type { BaseFieldProps } from "../../model/types";
import React from "react";

interface TextFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required = false, className = "", ...props }, ref) => {
    return (
      <BaseField label={label} required={required}>
        <input
          ref={ref}
          {...props}
          className={`${s.inputElement} ${className}`}
        />
      </BaseField>
    );
  }
);
Input.displayName = "Input";
