import React, { useMemo } from "react";
import text from "@text";
import { Flex, Input, Typography } from "@atoms";

const headerArr = [
  "СН",
  "ОБ",
  "ВЧ",
  "Вс. СН.",
  "Вс. ОБ.",
  "Вс. ВЧ.",
  "Залишок",
];

const headerArr2 = [
  "код",
  "товар",
  "од. вим.",
  "к-сть",
  "ціна",
  "сума"
];

const ids = [
  "sn",
  "ob",
  "vch",
];

const generateArrData = (obj, isInputs) => ([
    obj?.sn || "sn",
    obj?.ob || "ob",
    obj?.vch || "vch",
    obj?.vssn || "vssn",
    obj?.vsob || "vsob",
    obj?.vsvch || "vsvch",
    obj?.result || "result",
]);

const generateArrData2 = (obj, isInputs) => ([
  obj?.supplyCode || "code",
  obj?.supplyName || "name",
  obj?.supplyUnit || "unit",
  obj?.supplyCount || "count",
  obj?.supplyPricePerUnit || "price",
  obj?.supplyPricePerUnit * obj?.supplyCount || "sum"
]);

const ModalTableRow = ({ isHeader, data, isInputs, header2, table2 }) => {
  const memoTxts = useMemo(() => (isHeader ? (header2 ? headerArr2 : headerArr) : (table2 ? generateArrData2(data) : generateArrData(data))).map(txt => isInputs ? (
    <Input
      width={`${100/8}%`}
      marginLeft="20px"
      id={txt}
      name={txt}
      disabled={!(txt==="sn" || txt==="vch" || txt==="ob")}
      type="number"
      step="0.01"
      border="none"
      fontSize="16px"
      backgroundColor="none"
      borderBottom={`3px solid ${!(txt==="sn" || txt==="vch" || txt==="ob") ? "transparent" : "black"}`}
    />
  ) : (
    <Typography textAlign="center" width={`${100/9}%`} marginLeft="20px">{txt}</Typography>
  )), [data, isInputs, isHeader]);

  return (
    <Flex padding="20px">
      {!table2 && (
        isInputs ? (
          <Input
            width={`${100/8}%`}
            border="none"
            fontSize="16px"
            name="name"
            backgroundColor="none"
            borderBottom="3px solid black"
          />
        ) : (
          <Typography width={`${100/8}%`}>{isHeader ? text.table.name : data.name}</Typography>
        )
      )}
      {memoTxts.map(txt => txt)}
    </Flex>
  );
};

export default ModalTableRow;

