import React, { useMemo } from "react";
import text from "@text";
import { Button, Flex, Input, Typography, Image } from "@atoms";
import deleteIcon from "@public/delete.svg";

const Inputs = ({ names, labels, types }) => {
  const generatedData = labels.map((e, i) => ({
    label: labels[i],
    name: names[i],
    type: types[i]
  }));

  const inputs = useMemo(() => generatedData.map(el => (
    <Flex alignSelf="end" flexDirection="column" key={el.name} width="20%" paddingLeft="5%" paddingRight="5%">
      <Typography>{el.label}</Typography>
      <Input type={el.type === "float" ? "number" : el.type} border="3px solid #000" name={el.name} {...(el.type === "float" && {step: 0.01})} />
    </Flex>
  )), [names, labels]);
  return (
    <Flex backgroundColor="#78A48D" borderTop="3px solid" borderBottom="3px solid" padding="10px">
      {inputs.map(i=>i)}
    </Flex>
  );
};
const AccountingModal = ({ onClose, handleSubmit, data, newRowData, setNewRowData }) => {
  return (
    <Flex backgroundColor="#DACDA3" border="3px solid black" borderRadius="7px"  flexDirection="column" width="100%"  as="form" onSubmit={handleSubmit}>
        <Image
          src={deleteIcon}
          onClick={onClose}
          style={{ cursor: 'pointer', zIndex: 1 }}
          width="30px"
          height="30px"
          padding="10px"
          alignSelf="end"
        />
        <Typography textAlign="center" marginTop="-40px" marginBottom="20px" fontSize="20px" borderBottom="3px solid black">
          Додавання продукту
        </Typography>
        <Typography padding="10px">
        продукт відповідно до каталогу
        </Typography>
        <Inputs
          labels={["код", "найменування", "од. вим."]}
          names={["code", "name", "units"]}
          types={["number", "text", "text"]}
        />
        <Typography padding="10px">
        оприбуткування у кількості
        </Typography>
        <Inputs
          labels={["фактична к-сть", "ціна за 1 кг", "сума"]}
          names={["factcount", "price", "sum"]}
          types={["number", "float", "float"]}
        />
        <Typography padding="10px">
        термін придатності
        </Typography>
        <Inputs
          labels={["дата виготовлення", "вжити до", "термін(днів)"]}
          names={["date", "until", "days"]}
          types={["date", "date", "number"]}
        />
        <Flex margin="auto" padding="2%">
              <Button styleType="secondary" backgroundColor="#78A48D" marginRight="5%" type="submit">{text.button.add}</Button>
        </Flex>
      </Flex>
  );
};

export default AccountingModal;
