import React from "react";
import { ButtonWithPic } from "@molecules";
import { Flex } from "@atoms";
import text from '@text';
import { ROUTES } from '@constants';
import menu1 from '@public/menu1.svg';
import menu2 from '@public/menu2.svg';
import menu3 from '@public/menu3.svg';
import menu4 from '@public/menu4.svg';
import menu31 from "@public/import.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLS } from "../../store/localStorage";


const WithSideBlock = ({ children, sideContent, right, ratio}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goToPage = (page) => () => {
    navigate(page);
  };
  const logout = () => {
    clearLS();
    if (pathname===ROUTES.root) {
      window.location.reload(false);
    } else {
      goToPage(ROUTES.root)();
    }
  };

  const leftSideContent = (
    <Flex flexDirection="column" justifyContent="space-between" alignItms="center" marginTop="25px" marginBottom="25px">
      <ButtonWithPic src={menu1} txt={text.button.menu1} onClick={goToPage(ROUTES.menu)} isActive={ROUTES.menu === pathname} />
      <ButtonWithPic src={menu2} txt={text.button.menu2}  onClick={goToPage(ROUTES.documentsReceivedSupplies)} isActive={ROUTES.documentsReceivedSupplies === pathname} />
      <ButtonWithPic src={menu3} txt={text.button.menu3} onClick={goToPage(ROUTES.accounting)} isActive={ROUTES.accounting === pathname} />
      <ButtonWithPic src={menu31} txt="База даних" onClick={goToPage("/db")} isActive={"/db" === pathname} />
      <ButtonWithPic src={menu4} txt={text.button.menu4} onClick={logout} isActive={false} />
    </Flex>
  );

  return (
    <Flex>
      {!right && (
        <Flex width={`${100-ratio}%`}position="fixed" backgroundColor="#78A48D" borderRight="3px solid #000" height="100%">
          {leftSideContent || sideContent}
        </Flex>
      )}
      <Flex width={`${ratio}%`} {...(right ? {marginRight:`${100-ratio}%`} : {marginLeft:`${100-ratio}%`})} flexDirection="column">
      {children}
      </Flex>
      {right && (
        <Flex width={`${100-ratio}%`} right="0" position="fixed" backgroundColor="#78A48D" borderLeft="3px solid #000" height="100%">
          {sideContent}
        </Flex>
      )}
    </Flex>
  );
};

export default WithSideBlock;
