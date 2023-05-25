import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Error = styled.span`
  color: var(--primary);
  width: 100%;
`;

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function index({ name, label, error, placeholder, className = '', ...restProps }: DateInputProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-primary text-lg upper mb-2">
          {label}
        </label>
      )}
      <input {...restProps} type="date" className="input" name={name} placeholder={placeholder} />
      {error && <Error>{error}</Error>}
    </div>
  );
}