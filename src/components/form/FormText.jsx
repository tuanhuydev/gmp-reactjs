import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from '../commons/TextInput';
import PropTypes from 'prop-types';
export default function FormText({ name, control, ...restProps }) {
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

FormText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};
