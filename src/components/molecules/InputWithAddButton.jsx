import React, { useState } from "react";
import { Flex, Input, Typography } from "../atoms";



const InputC = ({ openModal2, myVal }) => {

  return (
    <Flex position="relative" width="200px" minWidth="200px" height="30px">
      <Input fontSize="12px" backgroundColor="#DACDA3" type="text" value={myVal} border="3px solid"  height="30px" width="100%" />
      <Typography
        position="absolute"
        right="1%"
        fontSize="20px"
        textAlign="center"
        top="5%"
        width="32px"
        height="30px"
        background="#78A48D"
        color="black"
        borderRadius="100%"
        onClick={openModal2}
        border="3px solid"
        style={{ cursor: "pointer" }}
      >
        +
      </Typography>
    </Flex>
  );
};

export default InputC;