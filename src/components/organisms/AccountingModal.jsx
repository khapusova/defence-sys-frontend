import React, { useEffect, useMemo, useState } from "react";
import text from "@text";
import { Button, Flex, Input, Typography, Image } from "@atoms";
import deleteIcon from "@public/delete.svg";
import Table from "./Table";
import moment from "moment";

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

const toFormat = (menuRozkladkaUsage) => {
  if (menuRozkladkaUsage) {
  const supplyUsedBreakfast = menuRozkladkaUsage.supplyUsedBreakfast;
  const supplyUsedLunch = menuRozkladkaUsage.supplyUsedLunch;
  const supplyUsedDiner = menuRozkladkaUsage.supplyUsedDiner;
  const supplyAvailable = menuRozkladkaUsage.supplyAvailable;

  const data = [];

  supplyAvailable.forEach(supply => {
    const supplyName = supply.supplyName;
    let sn = 0, ob = 0, vch = 0, mealsCount = 0;

    if (supplyUsedBreakfast.supplyPerMeal) {
      supplyUsedBreakfast.supplyPerMeal.forEach(meal => {
        if (meal.supplyName === supplyName) {
          sn += meal.supplyCount;
          mealsCount = supplyUsedBreakfast.mealsCount;
        }
      });
    }

    if (supplyUsedLunch.supplyPerMeal) {
      supplyUsedLunch.supplyPerMeal.forEach(meal => {
        if (meal.supplyName === supplyName) {
          ob += meal.supplyCount;
          mealsCount = supplyUsedLunch.mealsCount;
        }
      });
    }

    if (supplyUsedDiner.supplyPerMeal) {
      supplyUsedDiner.supplyPerMeal.forEach(meal => {
        if (meal.supplyName === supplyName) {
          vch += meal.supplyCount;
          mealsCount = supplyUsedDiner.mealsCount;
        }
      });
    }
    const av = supplyAvailable.find(el => el.supplyName === supplyName).supplyCount
    const result = supplyUsedBreakfast.mealsCount *sn + supplyUsedLunch.mealsCount * ob + supplyUsedDiner.mealsCount * vch;

    data.push({
      name: supplyName,
      sn: sn,
      ob: ob,
      vch: vch,
      vssn: sn * supplyUsedBreakfast.mealsCount,
      vsob: ob * supplyUsedLunch.mealsCount,
      vsvch: vch * supplyUsedDiner.mealsCount,
      result: av - result
    });
  });
  
  return data;
  }
};
const formattedDate = (inputDate) => moment(inputDate, 'DD.MM.YYYY').format('YYYY-MM-DD');

const AccountingModal = ({ onClose, handleSubmit, data, newRowData, setNewRowData, onSign }) => {
  const formattedRows = useMemo(() => toFormat(data?.menuRozkladkaUsage), [data]);
  const [selectedDate, setSelectedDate] = useState(formattedDate(data?.date));
  const isNew = useMemo(() => data?.id === 'newID', [data?.id]);
  const areInputsBlocked = useMemo(() => data?.isSigned, [data?.isSigned]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  useEffect(() => {
    setSelectedDate(formattedDate(data?.date));
  }, [data]);

  return (
    <Flex padding="20px" height="max-content" backgroundColor="#78A48D" flexDirection="column" width="100%"  as="form" id="accountingform" onSubmit={handleSubmit}>
        <Image
          src={deleteIcon}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          width="30px"
          height="30px"
          alignSelf="end"
        />
        <Typography margin="auto" marginBottom="20px" fontSize="40px">
          {text.title.modal1}
        </Typography>
        <Flex margin="10px 40px">
          <Typography alignSelf="center" fontSize="20px" marginRight="20px">{text.input.accountingDate}</Typography>
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
        <Flex display="block" margin="0px 40px">
          <Flex height="60%" width="100%">
            <Table disabled={areInputsBlocked} rows={formattedRows} isModalTable newRowData={newRowData} setNewRowData={setNewRowData} />
          </Flex>
          <Typography margin="auto" marginBottom="20px" fontSize="40px" textAlign="center">
            {text.title.modal2}
          </Typography>
          <Flex>
            <Flex backgroundColor="#DACDA3" width="50%" paddingTop="10px" paddingBottom="10px">
              <Flex width="25%" marginLeft="6.5%" flexDirection="column">
                <Typography textAlign="center">СН</Typography>
                <Input
                  type="number"
                  id="sncount"
                  name="sncount"
                  disabled={areInputsBlocked}
                  border="3px solid"
                  defaultValue={isNew ? "" :  data?.menuRozkladkaUsage?.supplyUsedBreakfast?.mealsCount}
                />
              </Flex>
              <Flex width="25%" marginLeft="6.5%" flexDirection="column">
                <Typography textAlign="center">ОБ</Typography>
                <Input
                  type="number"
                  id="obcount"
                  name="obcount"
                  disabled={areInputsBlocked}
                  border="3px solid"
                  defaultValue={isNew ? "" :  data?.menuRozkladkaUsage?.supplyUsedLunch?.mealsCount}
                />
              </Flex>
              <Flex width="25%" marginLeft="6.5%" flexDirection="column">
                <Typography textAlign="center">ВЧ</Typography>
                <Input
                  type="number"
                  id="vchcount"
                  name="vchcount"
                  disabled={areInputsBlocked}
                  border="3px solid"
                  defaultValue={isNew ? "" :  data?.menuRozkladkaUsage?.supplyUsedDiner?.mealsCount}
                />
              </Flex>
            </Flex>
            <Flex width="35%" marginLeft="5%">
              <Button styleType="secondary" marginRight="5%" type="button" onClick={onSign(data?.id)}>{text.button.sign}</Button>
              <Button styleType="secondary" type="submit">{text.button.form}</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
};

export default AccountingModal;
