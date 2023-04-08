import React from "react";
import styled from "styled-components";

const LogoStyle = styled.div`
  display: flex;
  color: var(--primary);

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 500;
  }
  h5 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 300;
  }
`;

export default function Logo() {
  return (
    <LogoStyle>
      <h3>react</h3>
      <h5>gmp</h5>
    </LogoStyle>
  );
}
