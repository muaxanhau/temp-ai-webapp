"use client";

import "react-datepicker/dist/react-datepicker.css";
import { ComponentBaseModel } from "@/models";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import styles from "../inputComponent/component.module.css";
import { InputComponent } from "../inputComponent/input.component";

type DateInputProps<
  T extends FieldValues,
  TControl = Control<T>,
  TName = FieldPath<T>
> = ComponentBaseModel<{
  control: TControl;
  name: TName;
  placeholder?: string;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}>;
export const DateInputComponent = <T extends {}>({
  control,
  name,
  placeholder,
  title,
  className,
  style,
}: DateInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: onChangeController, value },
        fieldState: { error },
      }) => (
        <InputComponent
          className={className}
          style={style}
          title={title}
          error={error?.message}
        >
          <DatePicker
            className={styles.input}
            selected={value}
            onChange={(date) =>
              onChangeController(date as PathValue<T, Path<T>>)
            }
            placeholderText={placeholder}
          />
        </InputComponent>
      )}
    />
  );
};
