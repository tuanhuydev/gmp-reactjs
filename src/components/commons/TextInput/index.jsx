import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.span`
  color: var(--primary);
  width: 100%;
`;
export default function index({
  name,
  label,
  error,
  placeholder,
  className = '',
  onChange,
  onBlur,
  value,
  ...restProps
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-primary text-lg upper mb-2 w-full">
          {label}
        </label>
      )}
      <input
        {...restProps}
        className="input"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
}

index.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  value: PropTypes.any,
};
