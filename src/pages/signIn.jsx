import React from "react";
import text from '@text';
import { Typography, Button, Flex, Image } from "@atoms";
import { WithSideBlock } from "@templates";
import logo from '@public/logo.svg';
import { SignInForm } from "../components/organisms";

const sideContent = (
  <Flex flexDirection="column" justifyContent="center" alignItms="center">
    <Typography fontSize="24px" textAlign="center">{text.title.howItWorks}</Typography>
    <Typography fontSize="14px" marginLeft="5%">{text.description.howItWorks}</Typography>
  </Flex>
);

const Page = () => (
  <WithSideBlock right sideContent={sideContent} ratio={70}>
    <Image src={logo} margin="20px" alighSelf="start" alt="logo" width="198px" />
    <Flex justifyContent="center" margin="auto" flexDirection="column" width="80%">
      <Typography type="title" fontSize="35px">
        {text.title.signIn}
      </Typography>
      <SignInForm />
      <Flex justifyContent="space-between" marginTop="5%" marginBottom="5%">
        <Button minWidth="25%" styleType="primary">{text.button.back}</Button>
        <Button minWidth="25%" styleType="primary">{text.button.continue}</Button>
      </Flex>
    </Flex>
  </WithSideBlock>
);

export default Page;