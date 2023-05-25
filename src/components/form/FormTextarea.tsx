import React from 'react';
import Textarea, { TextareaProps } from '@/components/commons/Textarea';
import { Controller } from 'react-hook-form';

export interface FormTextareaProps extends Partial<TextareaProps> {
  control: any;
}

export default function FormTextarea({ name, control, ...restProps }: FormTextareaProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => <Textarea {...restProps} onChange={onChange} onBlur={onBlur} name={name} value={value} />}
    />
  );
}