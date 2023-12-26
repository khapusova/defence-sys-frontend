import React, { useCallback, useEffect, useMemo, useState } from "react";
import text from '@text';
import { Typography, Button, Flex } from "@atoms";
import { Table, AccountingModal } from "@organisms";
import { WithSideBlock, WithModal } from "@templates";
import { useDispatch, useSelector } from "react-redux";
import { deleteaccounting, getAllAccountings, updateOrCreateAccounting } from "../store/accountingPage/duck";
import moment from "moment";
import { showError } from "../utils/notification";
import { FButton } from "../components/molecules";


const formattedDate = (inputDate) => moment(inputDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
function hasEmptyValues(obj) {
  for (const value of Object.values(obj)) {
    if (Array.isArray(value) && value.length === 0) {
      return true;
    } else if (typeof value === 'string' && value.length === 0) {
      return true;
    }
  }
  return false;
}

const Page = () => {
  const [isShown, setIsShown] = useState(0);
  const [newRowData, setNewRowData] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newModalData, setNewModalData] = useState({
    id: "newID",
    name: "Загальновійськова",
    isSigned: false,  
    menuRozkladkaUsage: {
        supplyUsedBreakfast: {},
        supplyUsedLunch: {},
        supplyUsedDiner: {},
        supplyAvailable: []
      }
  });

  const onDelete = (obj) => () => {
    dispatch(deleteaccounting(obj));
  };

  const arr = useSelector((state) => state.accounting.accounting);
  const tableData = useMemo(() => arr?.map(el => ({
    ...el,
    isSigned: el.documentStatus === "SIGNED",
    name: el.documentName,
  })), [arr]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccountings());
  }, []);
  const openModal = (id) => () => {
    setModalData((id && tableData.find(el=>el.id===id)) || newModalData);
    setIsShown(1);
  };

  const closeModal = () => {
    setIsShown(-1);
  };

  const onSign = (id) => () => {
    const form = document.getElementById('accountingform');
    const formValues = {};
    let isAnyInputEmpty = false;
    
    for (const input of form.elements) {
        if (input.tagName === 'INPUT' && input.name?.length !== 0) {
            if (input.value.trim() === '') {
                isAnyInputEmpty = true;
            }
            formValues[input.name] = input.value;
        }
    }
    
    if (isAnyInputEmpty) {
        showError("Не всі поля заповнені!");
    } else {
      dispatch(updateOrCreateAccounting({ id, documentStatus: "SIGNED" }))
      setIsShown(-1);
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formControlsArray = [...event.target.elements];
    
    const formControlsObject = formControlsArray.reduce((acc, control) => {
      if (control.name && control.name !== "vsob" && control.name !== "vssn" && control.name !== "vsvch" && control.name !== "result") {
          acc[control.name] = control.value;
      }
      return acc;
    }, {});
    const hasEmptyVals = hasEmptyValues(formControlsObject);
    if (hasEmptyVals) {
      showError("Не всі поля заповнені!");
    } else {
      const oldBreakfast = modalData?.menuRozkladkaUsage.supplyUsedBreakfast.supplyPerMeal || [];
      const oldLunch = modalData?.menuRozkladkaUsage.supplyUsedLunch.supplyPerMeal || [];
      const oldDinner = modalData?.menuRozkladkaUsage.supplyUsedDiner.supplyPerMeal || [];
      const spplyNames =  [
        ...oldBreakfast,
        {
          supplyName: formControlsObject.name,
          supplyUnit: "кг",
          supplyCount: parseFloat(formControlsObject.sn),
        }
      ].map(el => el.supplyName);
      const supplyAvailable = [
        {
          supplyName: "Морква",
          supplyUnit: "кг",
          supplyCount: 100
        },
        {
          supplyName: "Гречка",
          supplyUnit: "кг",
          supplyCount: 100
        },
        {
          supplyName: "Капуста",
          supplyUnit: "кг",
          supplyCount: 100
        },
        {
          supplyName: "Яблуко",
          supplyUnit: "кг",
          supplyCount: 100
        },
      ].filter(el => spplyNames.includes(el.supplyName));
      
      const myObjectToPut = {
        id: modalData?.id === 'newID' ? parseInt(arr[arr.length-1].id) + arr.length: modalData.id,
        date: formattedDate(formControlsObject.date),
        documentName: "Загальновійськова",
        documentStatus: "UNSIGNED",
        menuRozkladkaUsage: {
          supplyUsedBreakfast: {
            mealsCount: formControlsObject?.sncount,
            supplyPerMeal: [
              ...oldBreakfast,
              {
                supplyName: formControlsObject.name,
                supplyUnit: "кг",
                supplyCount: parseFloat(formControlsObject.sn),
              }
            ]
          },
          supplyUsedLunch: {
            mealsCount: formControlsObject?.obcount,
            supplyPerMeal: [
              ...oldLunch,
              {
                supplyName: formControlsObject.name,
                supplyUnit: "кг",
                supplyCount: parseFloat(formControlsObject.ob),
              }
            ]
          },
          supplyUsedDiner: {
            mealsCount: formControlsObject?.vchcount,
            supplyPerMeal: [
              ...oldDinner,
              {
                supplyName: formControlsObject.name,
                supplyUnit: "кг",
                supplyCount: parseFloat(formControlsObject.vch),
              }
            ]
          },
          supplyAvailable
        },
      };
      dispatch(updateOrCreateAccounting(myObjectToPut))
      closeModal();
    }

  };
  const renderModalContent = useCallback((onClose) => (
    <AccountingModal
      data={modalData}
      handleSubmit={handleSubmit}
      onClose={onClose}
      onSign={onSign}
      newRowData={newRowData}
      setNewRowData={setNewRowData}
    />
  ), [modalData, newRowData]);

  return (
    <WithModal
      renderModalContent={renderModalContent}
      isShown={isShown} 
      setIsShown={setIsShown}
    >
      <WithSideBlock ratio={80}>
        <Flex flexDirection="column">
          <Typography type="title" fontSize="50px" textAlign="start" margin="40px">
            {text.title.accounting}
          </Typography>
          <Table onDelete={onDelete} rows={tableData} openModal={openModal} />
          <Flex justifyContent="end" margin="40px">
            <Button styleType="primary" width="35%" onClick={openModal()}>
              {text.button.add}
            </Button>
            <FButton mainkey="accounting" st={{width: "35%", margin: "0px 10px"}} />
          </Flex>
        </Flex>
      </WithSideBlock>
    </WithModal>
  );
  
};

export default Page;