import React, { useEffect, useMemo, useState } from "react";
import text from "@text";
import { Button, Flex, Input, Typography, Image } from "@atoms";
import deleteIcon from "@public/delete.svg";
import Table from "./Table";
import moment from "moment";
import { Table2 } from ".";
import _ from 'lodash';
import { InputWithAddButton } from "../molecules";

const ElementTable = ({addMealsToDaysData, el, daysData, openModal2, time}) => (
  <Flex margin="0px 10px">
    <Input
      type="number"
      width="60px"
      height="30px"
      backgroundColor="#DACDA3"
      border="3px solid"
      fontSize="16px"
      value={daysData[el][time].meals}
      min="1"
      onChange={addMealsToDaysData(el, time)}
    />
    <InputWithAddButton openModal2={openModal2(el, time)} myVal={toFormat(daysData[el][time]?.food)} />
  </Flex>
);
const toFormat = (arr) => {
  let stri = "";
  arr?.forEach(element => {
    stri += `${element.supplyName} `
  });
  return stri;
};

const formattedDate = (inputDate) => moment(inputDate, 'DD.MM.YYYY').format('YYYY-MM-DD');

const AccountingModal = ({ daysData, required, setDaysData, onClose, handleSubmit, data, newRowData, setNewRowData, onSign, openModal2, onDaysChange, onStartDateChane }) => {
  const [selectedDate, setSelectedDate] = useState(formattedDate(data?.date));
  const isNew = useMemo(() => data?.id === 'newID', [data?.id]);
  const areInputsBlocked = useMemo(() => data?.isSigned, [data?.isSigned]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  console.log(data);


  const addMealsToDaysData = (date, time) => (event) => {
    setDaysData((prev) => {
      if (event.target.value) {
        const daysD = _.cloneDeep(prev);
        if (!daysD[date]) {
          daysD[date] = {};
        }
    
        if (!daysD[date][time]) {
          daysD[date][time] = {};
        }
        daysD[date][time] = JSON.parse(JSON.stringify(daysD[date][time]));
    
        daysD[date][time].meals = parseInt(event.target.value);
  
        return daysD;
      }
    
      return prev;
    });
    
  };


  useEffect(() => {
    setSelectedDate(data?.deadlineDate);
  }, [data]);

  return (
    <Flex padding="20px" backgroundColor="#DACDA3" border="3px solid black" borderRadius="7px"  flexDirection="column" width="100%" id="mainorderform" as="form" onSubmit={handleSubmit(data?.id)}>
        <Image
          src={deleteIcon}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          width="30px"
          height="30px"
          alignSelf="end"
        />
        <Typography margin="auto" marginBottom="20px" fontSize="40px">
        ОФОРМЛЕННЯ Замовлення
        </Typography>
        <Flex maxWidth="100%">
          <Flex margin="5px 30px" flexDirection="column" width="10%" alignSelf="end">
            <Typography alignSelf="center" fontSize="16px" marginRight="20px">Дедлайн доставки</Typography>
            <Input
              disabled={areInputsBlocked}
              type="date"
              min="0"
              fontSize="16px"
              name="deadline"
              border="3px solid #000"
              value={selectedDate}
              onChange={handleDateChange}
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="5px 30px" flexDirection="column" width="20%" alignSelf="end">
            <Typography fontSize="16px" alignSelf="center" marginRight="20px">Адреса доставки</Typography>
            <Input
              disabled={areInputsBlocked}
              defaultValue={data?.adress || ""}
              type="text"
              name="adress"
              fontSize="16px" 
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="5px 30px" flexDirection="column" width="5%" alignSelf="end">
            <Typography alignSelf="center" fontSize="16px" marginRight="20px">договір</Typography>
            <Input
              disabled={areInputsBlocked}
              defaultValue={data?.contract || ""}
              name="contract"
              type="number"
              fontSize="16px" 
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="5px 30px" flexDirection="column" width="20%" alignSelf="end">
            <Typography alignSelf="center" fontSize="16px" marginRight="20px">Підстава формування заяви</Typography>
            <Input
              fontSize="16px" 
              defaultValue={data?.reason || ""}
              disabled={areInputsBlocked}
              type="text"
              name="reason"
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="5px 30px" flexDirection="column" width="5%" alignSelf="end">
            <Typography alignSelf="center" fontSize="16px" marginRight="20px">К-ть днів замовлення*</Typography>
            <Input
              fontSize="16px" 
              defaultValue={data?.daysCount || ""}
              disabled={areInputsBlocked}
              type="number"
              onChange={onDaysChange}
              min="1"
              name="days"
              border="3px solid #000"
              fonstSize="20px" 
            />
          </Flex>
          <Flex margin="5px 30px" flexDirection="column" width="10%" alignSelf="end">
            <Typography alignSelf="center" fontSize="16px" marginRight="20px">Початкова дата*</Typography>
            <Input
              disabled={areInputsBlocked}
              type="date"
              onChange={onStartDateChane}
              fontSize="16px"
              name="startdate"
              border="3px solid #000"
              value={required.startDate}
              fonstSize="20px" 
            />
          </Flex>
          
        </Flex>
        <Flex flexDirection="column" backgroundColor="#78A48D" margin="10px  -20px -20px">
        <Flex flexDirection="column" height="400px" maxHeight="400px" overflowY="auto" margin="0px 40px">
          <Flex width="800px" height="50px" minHeight="50px">
            <Typography minWidth="146px">Дата</Typography>
            <Typography minWidth="290px">Сніданок</Typography>
            <Typography minWidth="290px">Обід</Typography>
            <Typography minWidth="290px">Вечеря</Typography>
          </Flex>
          {required?.startDate && required?.days && daysData && Object.keys(daysData)?.map(el => (
            <Flex width="800px" height="50px" minHeight="50px">
              <Typography width="300px">{el}</Typography>
              <ElementTable addMealsToDaysData={addMealsToDaysData} el={el} daysData={daysData} openModal2={openModal2} time="breakfast" />
              <ElementTable addMealsToDaysData={addMealsToDaysData} el={el} daysData={daysData} openModal2={openModal2} time="lunch" />
              <ElementTable addMealsToDaysData={addMealsToDaysData} el={el} daysData={daysData} openModal2={openModal2} time="dinner" />
            </Flex>
          ))}
        </Flex>
          <Flex width="35%" marginLeft="40px" marginBottom="20px">
              <Button
                fontSize="16px"
                padding="10px"
                height="40px"
                styleType="secondary"
                marginRight="5%"
                type="button"
                onClick={onSign(true)}
              >
                {text.button.sign}
              </Button>
              <Button
                fontSize="16px"
                padding="10px"
                height="40px"
                styleType="secondary"
                marginRight="5%"
                type="button"
                onClick={onSign(false)}
              >
                Зберегти без підпису
              </Button>
          </Flex>
        </Flex>
      </Flex>
  );
};

export default AccountingModal;
