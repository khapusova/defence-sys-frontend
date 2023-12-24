import React from "react";
import text from '@text';
import {  Flex } from "@atoms";
import { WithSideBlock } from "@templates";
import { ButtonWithPic } from "@molecules";
import menu1 from '@public/menu_roskladka1.svg';
import menu2 from '@public/menu_roskladka2.svg';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { clearLS } from "../store/localStorage";


const Page = () => {
  const navigate = useNavigate();
  const goTo = (page) => () => {
    navigate(page);
  };


  return (
    <WithSideBlock ratio={80}>
      <Flex marginLeft="2%" marginRight="2%" justifyContent="center" height="100%" marginBottom="10%" marginTop="10%">
        <ButtonWithPic type2 src={menu1} txt={text.button.menuRoz1} onClick={goTo(ROUTES.root)} />
        <ButtonWithPic type2 src={menu2} txt={text.button.menuRoz2}  onClick={goTo(ROUTES.order)} />
      </Flex>
    </WithSideBlock>
  );
};

export default Page;