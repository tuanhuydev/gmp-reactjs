import React, { TextareaHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.span`
  color: var(--primary);
  width: 100%;
`;
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function index({ name, label, error, placeholder, className = '', ...restProps }: TextareaProps) {
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
