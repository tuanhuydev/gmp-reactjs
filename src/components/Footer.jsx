import React from 'react'
import styled from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
  background-color: var(--greyter);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export default function Footer() {
  return (
    <Container>
      <Logo />
    </Container>
  )
}
