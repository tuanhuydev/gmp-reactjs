import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput, { TextInputProps } from '../commons/TextInput';

interface FormTextProps extends Partial<TextInputProps> {
  control: any;
}

export default function FormText({ name, control, ...restProps }: FormTextProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextInput {...restProps} onChange={onChange} onBlur={onBlur} name={name} value={value} className="flex-2" />
      )}
    />
  );
}
