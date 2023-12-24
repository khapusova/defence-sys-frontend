import React from "react";
import text from '@text';
import styled from "styled-components";
import { Flex, Typography, Image } from "@atoms";
import deleteIcon from '@public/delete.svg';
import editIcon from '@public/edit.svg';
import printIcon from '@public/print.svg';
import sendIcon from '@public/send.svg';

const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const PointerImage = styled(Image)`
  cursor: pointer;
`;


const InfoRow = ({ info, openModal, isHistory, onDelete }) => {
  return (
    <Flex alignItems="center" marginLeft="40px" margin="20px 40px">
      {isHistory ? (
        <Typography fontSize="25px" width="65%">{info.name}</Typography>
      ) : (
        <Typography fontSize="25px" width="65%">{info.name} від {info.date}</Typography>
      )}
      <Typography
        fontSize="25px"
        marginRight="1%"
        width="25%"
        marginLeft="1%"
        textDecoration="underline"
        color={info.isSigned ? "#3D790F" : "#AF2727"}
      >
        <UnderlinedText>
          {info.isSigned ? text.table.signed : text.table.notSigned}
        </UnderlinedText>
      </Typography>
      <Flex width="15%" justifyContent="space-between">
        {!info?.isSigned  ? (
            <PointerImage
              src={editIcon}
              onClick={openModal(info.id)}
              width="45px"
              height="45px"
            />
        ) : (
          isHistory ? (
            <PointerImage
              src={sendIcon}
              onClick={() => {}}
              width="45px"
              height="45px"
            />
          ) : (
            <Flex width="45px" />
          )
        )}
        <PointerImage src={printIcon} width="45px" height="45px" />
        <PointerImage src={deleteIcon} onClick={onDelete(info)} width="45px" height="45px" />
      </Flex>
    </Flex>
  );
};

export default InfoRow;