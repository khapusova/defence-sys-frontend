import React from "react";
import text from '@text';
import { Typography, Button, Flex, Image } from "@atoms";
import logo from '@public/logo.svg';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@constants';

const Page = () => {
  
  const navigate = useNavigate();
  const handleNavigationButtonClick = (path) => () => {
    navigate(path);
  };

  return (
    <Flex maxWidth="80%" justifyContent="center" margin="auto" flexDirection="column">
      <Image src={logo} alignSelf="center" marginTop="27px" marginBottom="27px" alt="logo" width="20%" />
      <Typography type="title">
        {text.title.main}
      </Typography>
      <Flex justifyContent="space-between" marginTop="5%" marginBottom="5%">
        <Button minWidth="25%" styleType="primary" onClick={handleNavigationButtonClick(ROUTES.signUp)}>{text.button.signUp}</Button>
        <Button minWidth="25%" styleType="primary" onClick={handleNavigationButtonClick(ROUTES.signIn)}>{text.button.signIn}</Button>
      </Flex>
    </Flex>
  );
};

export default Page;