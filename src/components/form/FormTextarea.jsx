import React from 'react';
import Textarea from '../commons/Textarea';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export default function FormTextarea({ name, control, ...restProps }) {
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

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};
