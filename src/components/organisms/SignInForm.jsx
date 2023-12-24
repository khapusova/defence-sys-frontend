import React, { useState} from "react";
import { KeyFileInput } from "@molecules";
import text from "@text";
import { Flex, Input } from "@atoms";
import styled from "styled-components";
import { Typography } from "../atoms";



const Select = styled.select`
  background: none;
  border: none;
  border-bottom: 2px solid black;
  font-family: 'Rubik Mono One',sans-serif;
  font-size: 24px;
`;


const SignInForm = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState(null);
  const [select, setSelect] = useState(null);
  return (
    <Flex flexDirection="column">
      <KeyFileInput file={file} setFile={setFile} />
      <Flex flexDirection="column" marginTop="30px" marginBottom="30px">
        <Typography as="label" htmlFor="mySelector" color="rgba(0, 0, 0, 0.70)" fontSize="16px">{text.input.label1}</Typography>
        <Select
          id="mySelector"
          value={text.input.select1}
          // onChange={handleSelectChange}
        >
          <Typography as="option" value={text.input.select1}>{text.input.select1}</Typography>
  
        </Select>
      </Flex>
      <Input type="inp1" value={password} placeholder={text.input.password} />
    </Flex>
  );
};


export default SignInForm;
