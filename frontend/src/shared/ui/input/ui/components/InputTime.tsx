import s from "../index.module.scss";
import { BaseField } from "..";
import type { BaseFieldProps } from "../../model/types";
import React from "react";

interface DateFieldProps
  extends BaseFieldProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const InputTime = React.forwardRef<HTMLInputElement, DateFieldProps>(
  ({ label, required = false, className = "", ...props }, ref) => {
    return (
      <BaseField label={label} required={required}>
        <input
          ref={ref}
          type="time"
          {...props}
          className={`${s.inputElement} ${className}`}
        />
      </BaseField>
    );
  }
);
InputTime.displayName = "InputTime";
