import React from 'react';
import Modal from './Base';
import styled from 'styled-components';

export default function Toast({ open = false, title, icon, description }: any) {
  return (
    <Modal open={open}>
      <div className="flex flex-col items-center">
        {<div>{icon}</div>}
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </div>
    </Modal>
  );
}

const Title = styled.h2`
  font-size: 2.5rem;
  margin-top: 3rem;
  color: var(--light);
  font-weight: 100;
  text-align: center;
`;

const Description = styled.p`
  color: var(--light);
  text-align: center;
  max-width: 15rem;
`;