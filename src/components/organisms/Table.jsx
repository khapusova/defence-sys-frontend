import React, { useEffect, useMemo, useState } from "react";
import { InfoRow, ModalTableRow } from "@molecules";
import { Button, Flex } from "../atoms";

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
  // const [updatedRows, setUpdatedRows] = useState(rows);
  const memoRows = useMemo(() => rows?.map(row => isModalTable ? (
    <ModalTableRow data={row} />
  ) : (
    <InfoRow info={row} key={row.id} openModal={openModal} isHistory={isHistory} onDelete={onDelete} />
  )), [rows, isModalTable, openModal, isHistory]);
  
  const addInputsRow = () => {
    setNewRowData(prev => prev ? prev + 1 : 1);
  };


  return (
    <Flex flexDirection="column" {...(isModalTable && { backgroundColor: "#DACDA3", width: "100%", margin: "20px 40px",  overflowY: "auto"})}>
      {isModalTable && (
        <ModalTableRow isHeader />
      )}
      {memoRows?.map(row => row)}
      {isModalTable && newRowData && !disabled && (
        <ModalTableRow isInputs />
      )}
      {isModalTable && !disabled &&  (
        <Button styleType="default"  type="button" textAlign="left" onClick={addInputsRow}>
          +
        </Button>
      )}
    </Flex>
  );
};

export default Table;
