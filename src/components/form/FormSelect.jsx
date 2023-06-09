import React from 'react';
import { Controller } from 'react-hook-form';
import Select from '../commons/Select';
import PropTypes from 'prop-types';

export default function FormSelect({ name, control, ...restProps }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value = [], name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        const handleSelect = (values) => onChange(values);
        return <Select onSelect={handleSelect} value={value} isMultiple {...restProps} />;
      }}
    />
  );
}
FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
};
