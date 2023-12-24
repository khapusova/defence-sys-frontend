import React from "react";
import { Typography, Button, Flex, Image } from "@atoms";
import logo from '@public/logo.svg';
import WithSideBlock from "../components/templates/WithSideBlock";
import { Input } from "../components/atoms";
import { showSuccess } from "../utils/notification";


const Page = () => {
  const change = (e) => {
    if(e.target.files?.length > 0) {
      setTimeout(() => {
        showSuccess("Дані успішно імпортовано!");
      }, 1000)
    }
  };

  const onExport = () => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    const fileUrl = `${process.env.PUBLIC_URL}/db.json`;

    anchor.href = fileUrl;
    anchor.download = 'db.json';
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(() => {
      showSuccess("Дані успішно експортовано!");
    }, 1000)
  };

  return (
    <WithSideBlock ratio={80}>
      <Flex maxWidth="80%" justifyContent="center" margin="auto" flexDirection="column">
        <Image src={logo} alignSelf="center" marginTop="27px" marginBottom="27px" alt="logo" width="20%" />
        <Typography type="title">
          База даних
        </Typography>
        <Flex justifyContent="space-between" marginTop="5%" marginBottom="5%">
          <Flex position="relative" marginRight="20px">
            <Button
              minWidth="25%"
              styleType="primary"
            >
              Імпорт даних
            </Button>
            <Input accept=".json" onChange={change} style={{ cursor: "pointer" }} position="absolute" width="100%" type="file" height="100%" opacity="0" />
          </Flex>
          <Button minWidth="25%" styleType="primary" onClick={onExport}>Експорт даних</Button>
        </Flex>
      </Flex>
    </WithSideBlock>
  );
};

export default Page;