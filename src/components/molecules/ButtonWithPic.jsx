import React from "react";
import { Typography, Image, Flex } from "../atoms";

const ButtonWithPic = ({ onClick, txt, src, type2, isActive }) => (
  <Flex
    flexDirection="column"
    onClick={onClick}
    {...(type2 ? {
      backgroundColor:"#DACDA3",
      border: "3px solid #000",
      boxShadow: "3.114px 3.114px 28.809px 0px rgba(0, 3, 4, 0.40)",
      marginLeft: "5%",
      marginRight: "5%",
    } : {
      background: isActive ? "#92AA9E" : "",
      borderTop: isActive ? "3px solid #000" : "",
      borderBottom: isActive ? "3px solid #000" : "",
      height: `${100/5}%`,
      padding: "5px"
    })}
    style={{ cursor: "pointer" }}
    flex="0"
  >
    <Image
      src={src}
      alignSelf="center"
      alt="logo"
      height={type2 ? "300px" : "60%"}
      {...(type2 && { minWidth: "300px", mardin: "25px"})}
    />
    <Typography textAlign="center" fontSize="20px">{txt}</Typography>
  </Flex>
);

export default ButtonWithPic;
