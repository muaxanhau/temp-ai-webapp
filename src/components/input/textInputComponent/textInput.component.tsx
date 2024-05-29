"use client";

import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
import { InputComponent } from "../inputComponent/input.component";
import styles from "../inputComponent/component.module.css";

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
};
export function TextInputComponent<T extends FieldValues>({
  type,
  placeholder,
  title,
  className,
  style,
  ...rest
}: TextInputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController(rest);

  return (
    <InputComponent
      className={className}
      style={style}
      title={title}
      error={error?.message}
    >
      <input
        {...field}
        placeholder={placeholder}
        className={styles.input}
        security="•"
        type={type}
      />
    </InputComponent>
  );
}
