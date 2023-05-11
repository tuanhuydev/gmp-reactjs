import React from 'react';
import DateInput from '../commons/DateInput';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
export default function FormDate({ name, control, ...restProps }) {
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

FormDate.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};
