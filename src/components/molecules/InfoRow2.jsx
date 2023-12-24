import React from "react";
import text from '@text';
import styled from "styled-components";
import { Flex, Typography, Image } from "@atoms";
import deleteIcon from '@public/delete.svg';
import editIcon from '@public/edit.svg';
import printIcon from '@public/print.svg';

const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const PointerImage = styled(Image)`
  cursor: pointer;
`;


const InfoRow = ({ info, openModal, isHistory, isHeader, onDelete }) => {
  return (
    <Flex alignItems="center" marginLeft="40px" margin="20px 40px">
      <Typography fontSize="25px" width="15%">{!isHeader ? info.documentCode : "код"}</Typography>
      <Typography fontSize="25px" width="40%">{!isHeader ? info.date : "дата постачання"}</Typography>
      <Typography fontSize="25px" width="10%">{!isHeader ? info.documentNumber : "№"}</Typography>
      <Typography fontSize="25px" width="15%">{!isHeader ? (info.supplyGeneralPrice || info?.supplies?.map(el=>el.supplyCount * el.supplyPricePerUnit).reduce((acc, num) => acc + num, 0)) : "сума"}</Typography>
      <Typography
        fontSize="25px"
        marginRight="1%"
        width="30%"
        marginLeft="1%"
        textDecoration="underline"
        color={info?.isSigned ? "#3D790F" : "#AF2727"}
      >
        {!isHeader && (
          <UnderlinedText>
            {info?.isSigned ? text.table.signed : text.table.notSigned}
          </UnderlinedText>
        )}
      </Typography>
      <Flex width="15%" justifyContent="space-between">
      {!isHeader && (
        <>
          {!info?.isSigned  ? (
            <PointerImage
              src={editIcon}
              onClick={openModal(info.id)}
              width="45px"
              height="45px"
            />
        ) : (
          <Flex width="45px" />
        )}
          <PointerImage src={printIcon} width="45px" height="45px" />
          <PointerImage src={deleteIcon} onClick={onDelete(info)} width="45px" height="45px" />
        </>
      )}
      </Flex>
    </Flex>
  );
};

export default InfoRow;