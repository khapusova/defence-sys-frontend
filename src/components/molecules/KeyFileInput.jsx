import React, { useState } from "react";
import text from "@text";
import styled, { css } from "styled-components";
import { Typography, Flex } from "@atoms";

const HiddenInput = styled.input`
  ${({ isSayHiBlock, disabled }) => css`
    opacity: 0;
    position: absolute;
    cursor: ${disabled ? "default" : "pointer"};
    font-size: 0;
    width: 100%;
    height: 100%;
    right: 0;
  `}
`;

const KeyFileInput = ({ file, setFile }) => (
  <Flex marginTop="5%" width="100%" position="relative" >
    <Flex width="100%" boxShadow="3.114px 3.114px 28.809px 0px rgba(0, 3, 4, 0.40)" backgroundColor="btn1" flexDirection="column" border="3px dashed #000" borderRadius="8px" padding="40px">
      {!!file ? (
        <Typography textAlign="center" fontSize="24px">{file.name}</Typography>
      ) : (
        <>
          <Typography textAlign="center" fontSize="24px">{text.input.drag}</Typography>
          <Typography textAlign="center" fontSize="14px" color="rgba(0, 0, 0, 0.63)" marginTop="25px">{text.input.formats}</Typography>
        </>
      )}
    </Flex>
    <HiddenInput
        type="file"
        accept=".docx, .jks, .pfx, .pk8, .zs2, .dat"
        onChange={({ target: { files } }) => {
          setFile(files[0]);
        }}
      />
  </Flex>
);

export default KeyFileInput;