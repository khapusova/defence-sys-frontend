import React, { useEffect, useMemo, useState } from "react";
import text from "@text";
import { Button, Flex, Input, Typography, Image } from "@atoms";
import deleteIcon from "@public/delete.svg";
import Table from "./Table";
import moment from "moment";
import { Table2 } from ".";

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

const formattedDate = (inputDate) => moment(inputDate, 'DD.MM.YYYY').format('YYYY-MM-DD');

const AccountingModal = ({ onClose, handleSubmit, data, newRowData, setNewRowData, onSign }) => {
  const [selectedDate, setSelectedDate] = useState(formattedDate(data?.date));
  const isNew = useMemo(() => data?.id === 'newID', [data?.id]);
  const areInputsBlocked = useMemo(() => data?.isSigned, [data?.isSigned]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  useEffect(() => {
    setSelectedDate(data?.date);
  }, [data]);

  return (
    <Flex padding="20px" backgroundColor="#DACDA3" border="3px solid black" borderRadius="7px"  flexDirection="column" width="100%"  as="form" onSubmit={handleSubmit(data?.id)}>
        <Image
          src={deleteIcon}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          width="30px"
          height="30px"
          alignSelf="end"
        />
        <Typography margin="auto" marginBottom="20px" fontSize="40px">
          ОПРИБУТКУВАННЯ ПРИБУТКІВ
        </Typography>
        <Flex maxWidth="100%">
          <Flex margin="10px 40px" flexDirection="column" width="20%">
            <Typography alignSelf="center" fontSize="20px" marginRight="20px">Дата постачання</Typography>
            <Input
              disabled={areInputsBlocked}
              type="date"
              name="date"
              border="3px solid #000"
              value={selectedDate}
              onChange={handleDateChange}
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="10px 40px" flexDirection="column" width="7%">
            <Typography alignSelf="center" fontSize="20px" marginRight="20px">№</Typography>
            <Input
              disabled={areInputsBlocked}
              defaultValue={data?.documentNumber || ""}
              type="number"
              name="num"
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="10px 40px" flexDirection="column" width="15%">
            <Typography alignSelf="center" fontSize="20px" marginRight="20px">Тип постачання</Typography>
            <Input
              disabled={areInputsBlocked}
              defaultValue={data?.supplyReceivedType || ""}
              name="type"
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="10px 40px" flexDirection="column" width="20%">
            <Typography alignSelf="center" fontSize="20px" marginRight="20px">договір оприбуткування</Typography>
            <Input
              defaultValue={data?.supplyReceivedContract || ""}
              disabled={areInputsBlocked}
              type="text"
              name="contract"
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          
        </Flex>
        <Flex flexDirection="column" backgroundColor="#78A48D" margin="10px  -20px -20px">
          <Flex display="block" margin="" borderTop="3px solid">
            <Flex maxHeight="80%" width="100%" flexDirection="column" borderBottom="3px solid">
              <Table2 disabled={areInputsBlocked} rows={data?.supplies} isModalTable newRowData={newRowData} setNewRowData={setNewRowData} />
            </Flex>
            <Typography padding="20px" textAlign="center">Загальна сума: {data?.supplies?.map(el=>el.supplyCount * el.supplyPricePerUnit).reduce((acc, num) => acc + num, 0)}</Typography>
          </Flex>
          <Flex width="35%" marginLeft="5%" marginBottom="5%">
                <Button styleType="secondary" marginRight="5%" type="button" onClick={onSign}>{text.button.sign}</Button>
          </Flex>
        </Flex>
      </Flex>
  );
};

export default AccountingModal;
