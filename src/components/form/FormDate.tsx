import React from 'react';
import DateInput, { DateInputProps } from '../commons/DateInput';
import { Controller } from 'react-hook-form';

export interface FormDateProps extends Partial<DateInputProps> {
  control: any;
}

export default function FormDate({ name, control, ...restProps }: FormDateProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => <DateInput {...restProps} onChange={onChange} onBlur={onBlur} name={name} value={value} />}
    />
  );
}