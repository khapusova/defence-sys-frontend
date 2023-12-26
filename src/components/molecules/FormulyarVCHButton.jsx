import React from "react";
import { Button } from "../atoms";
import { onExport } from "../../pages/database";

const Component = ({ mainkey, st }) => {
  return (
    <Button onClick={onExport(mainkey)} styleType="primary" {...(st && st)}>Формуляр ВЧ</Button>
  );
};

export default Component;
