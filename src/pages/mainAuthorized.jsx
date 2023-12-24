import React from "react";
import text from '@text';
import styled from "styled-components";
import { Typography, Flex, Image } from "@atoms";
import { WithSideBlock } from "@templates";
import logo2 from '@public/logo2.svg';


const mockedData = {
  name: "Петренко Денис Олександрович",
  data: ["Капітан", "заступник командира з питань продовольства військової частини номер А0666"],
  description: "28-ма окрема механізована бригада імені Лицарів Зимового Походу"
};

const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const Page = () => (
  <WithSideBlock ratio={80}>
    <Flex marginLeft="2%" marginRight="2%" justifyContent="center"flexDirection="column">
      <Typography type="title" fontSize="75px" textAlign="start">
        {text.title.authoMain}
      </Typography>
      <Typography as={UnderlinedText} fontSize="45px">
        {mockedData.name}
      </Typography>
      {mockedData.data.map(txt => (
        <Typography fontSize="30px">
          {txt}
        </Typography>
      ))}
      <Image src={logo2} alignSelf="center" marginTop="27px" marginBottom="27px" alt="logo" width="20%" />
      <Typography fontSize="30px" textAlign="center">
        {mockedData.description}
      </Typography>
    </Flex>
  </WithSideBlock>
);

export default Page;