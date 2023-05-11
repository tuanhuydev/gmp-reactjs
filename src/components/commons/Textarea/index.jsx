import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.span`
  color: var(--primary);
  width: 100%;
`;

export default function index({ name, label, error, placeholder, className = '', ...restProps }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-primary text-lg upper mb-2">
          {label}
        </label>
      )}
      <textarea {...restProps} className="input" name={name} placeholder={placeholder} />
      {error && <Error>{error}</Error>}
    </div>
  );
}

index.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
};
