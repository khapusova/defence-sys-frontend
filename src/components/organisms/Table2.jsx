import React, { useEffect, useMemo, useState } from "react";
import { InfoRow2, ModalTableRow } from "@molecules";
import text from "@text";
import { Button, Flex, Typography } from "../atoms";

const emptyObj = {
  name: "",
  sn: "",
  ob: "",
  vch: "",
  vssn: "",
  vsob: "",
  vsvch: "",
  result: "",
};

const Table = ({ rows, openModal, isModalTable, isHistory, newRowData, setNewRowData, disabled, onDelete }) => {
  const memoRows = useMemo(() => rows?.map(row => isModalTable ? (
    <ModalTableRow table2 data={row} />
  ) : (
    <InfoRow2 info={row} key={row.id} openModal={openModal} isHistory={isHistory} onDelete={onDelete} />
  )), [rows, isModalTable, openModal, isHistory]);
  
  const addInputsRow = () => {
    setNewRowData(prev => prev ? prev + 1 : 1);
  };

  
  return (
    <Flex flexDirection="column" {...(isModalTable && { backgroundColor: "#78A48D", padding: "20px 0px 0px",  overflowY: "auto"})}>
      {isModalTable ? (
        <>
          <Flex width="100%" justifyContent="end" margin="0px -20px">
            <Button styleType="secondary"fontSize="16px" width="10%" type="submit">{text.button.add}</Button>
          </Flex>
          <Typography margin="0px 20px">Таблиця продуктів</Typography>
          <ModalTableRow isHeader header2 />
          <Flex flexDirection="column"   borderTop="3px solid" {...(isModalTable && { backgroundColor: "#DACDA3", width: "100%"})}>
            {memoRows?.map(row => row)}
          </Flex>
        </>
      ): (
        <>
          <InfoRow2 isHeader />
          {memoRows?.map(row => row)}
        </>
      )}
     
      {isModalTable && newRowData && !disabled && (
        <ModalTableRow isInputs />
      )}
    </Flex>
  );
};

export default Table;
