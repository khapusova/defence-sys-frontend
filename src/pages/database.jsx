import React from "react";
import { Typography, Button, Flex, Image } from "@atoms";
import logo from '@public/logo.svg';
import WithSideBlock from "../components/templates/WithSideBlock";
import { Input } from "../components/atoms";
import { showSuccess } from "../utils/notification";
import CsvDownloadButton from 'react-json-to-csv';
import json from"@public/db.json";
import Papa from 'papaparse';


// Function to export data as a file
  const exportData = (data, fileName, type) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  export const onExport = (mainKey) => () => {
    if (mainKey) {
      console.log(mainKey);
      const data = json[mainKey];
        if (data && data.length > 0) {
          const stringifiedData = data.map(obj => {
            return Object.keys(obj).reduce((acc, objKey) => {
              acc[objKey] = typeof obj[objKey] === 'object' ? JSON.stringify(obj[objKey]) : obj[objKey];
              return acc;
            }, {});
          });
  
          const csvData = Papa.unparse(stringifiedData);
          const bom = '\uFEFF';
          const csvDataWithBom = bom + csvData;
          exportData(csvDataWithBom, `${mainKey}_data.csv`, 'text/csv;charset=utf-8;');

        }
    } else {
      const keys = Object.keys(json);

// Check if there is any data available
if (keys.length > 0) {
  // Loop through each key and export the corresponding data
  keys.forEach(key => {
    const data = json[key];

    if (data && data.length > 0) {
      const stringifiedData = data.map(obj => {
        return Object.keys(obj).reduce((acc, objKey) => {
          acc[objKey] = typeof obj[objKey] === 'object' ? JSON.stringify(obj[objKey]) : obj[objKey];
          return acc;
        }, {});
      });

      const csvData = Papa.unparse(stringifiedData);
      const bom = '\uFEFF';
      const csvDataWithBom = bom + csvData;

      // Export data for the current key
      exportData(csvDataWithBom, `${key}_data.csv`, 'text/csv;charset=utf-8;');
    } else {
      console.warn(`No data available for key: ${key}`);
    }
  });
} else {
  console.warn('No keys found for export.');
}
    }
  };

const Page = () => {
  const change = (e) => {
    if(e.target.files?.length > 0) {
      setTimeout(() => {
        showSuccess("Дані успішно імпортовано!");
      }, 1000)
    }
  };

  

  return (
    <WithSideBlock ratio={80}>
      <Flex maxWidth="80%" justifyContent="center" margin="auto" flexDirection="column">
        <Image src={logo} alignSelf="center" marginTop="27px" marginBottom="27px" alt="logo" width="20%" />
        <Typography type="title">
          База даних
        </Typography>
        <Flex justifyContent="space-between" marginTop="5%" marginBottom="5%">
          <Flex position="relative" marginRight="20px">
            <Button
              minWidth="25%"
              styleType="primary"
            >
              Імпорт даних
            </Button>
            <Input accept=".json" onChange={change} style={{ cursor: "pointer" }} position="absolute" width="100%" type="file" height="100%" opacity="0" />
          </Flex>
          <Button minWidth="25%" styleType="primary" onClick={onExport()}>Експорт даних</Button>
        </Flex>
      </Flex>
    </WithSideBlock>
  );
};

export default Page;