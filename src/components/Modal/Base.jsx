import React, { useRef } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: var(--dark-lighter);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dialog = styled.div`
  border-radius: var(--border-radius);
  background-color: var(--dark);
  position: relative;
  padding: 1rem;
  min-width: 20vw;
  min-height: 12vw;
`;

const CloseIcon = styled.button`
  background-color: transparent;
  border-radius: var(--border-radius);
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 400;
`;

export default function Modal({
  title,
  children,
  open = false,
  closable = true,
  onClose,
  ...restProps
}) {
  const containerRef = useRef();

  return (
    <div ref={containerRef}>
      {open &&
        containerRef &&
        createPortal(
          <Container {...restProps}>
            <Dialog>
              <div className="title">
                {title && <Title className="text-light">{title}</Title>}
                {closable && (
                  <CloseIcon onClick={onClose}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32"
                      width="32"
                      className="fill-light"
                      viewBox="0 96 960 960"
                    >
                      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                    </svg>
                  </CloseIcon>
                )}
              </div>
              {children}
            </Dialog>
          </Container>,
          document.getElementById("modal")
        )}
    </div>
  );
}
