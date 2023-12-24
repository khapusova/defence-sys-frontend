import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Flex } from "@atoms";

const StyledDiv = styled.div`
  ${({ isShown, priority }) => css`
    background-color: black;
    opacity: ${isShown === 2 ? "0.5" : "0"};
    display: ${isShown === 0 ? "none" : "flex"};
    transition: 1s;
    position: fixed;
    z-index: ${priority ? 16 : 14};
    width: 100%;
    height: 100%;
  `}
`;

const StyledFlex = styled(Flex)`
  ${({ isShown, isRecently, priority, lagre }) => css`
    opacity: ${isShown === 2 ? "1" : "0"};
    display: ${isShown === 0 ? "none" : "flex"};
    transition: 1s;
    position: fixed;
    z-index: ${priority ? 20 : 15};
    background-color: white;
    width: ${ priority ? "60" : "90" }%;
    left: 50%;
    border-radius: 8px;
    top: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 1200px) {
      width: ${ priority ? "60" : (lagre ? "92" : "80") }%;
    }
  `}
`;


const WithModal = ({ children, renderModalContent, isShown, setIsShown, priority, lagre }) => {

  useEffect(() => {
    if (isShown === 1) {
    setTimeout(() => {
      setIsShown(2);
    }, [100]);
    }
    if (isShown === -1) {
      setTimeout(() => {
        setIsShown(0);
      }, [1000]);
    }
  }, [isShown]);


  const onClose = () => {
    setIsShown(-1);
  };

  return(
    <div>
      <StyledDiv isShown={isShown} priority={priority} />
      <StyledFlex isShown={isShown} priority={priority} lagre={lagre}>
        {renderModalContent(onClose)}
        {/* <ModalForm onClose={onClose} /> */}
      </StyledFlex>
      {children}
    </div>
  );
};

export default WithModal;
