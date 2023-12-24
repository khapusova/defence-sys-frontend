import React, { useCallback, useEffect, useMemo, useState } from "react";
import text from '@text';
import { Typography, Button, Flex } from "@atoms";
import { Table2, OprModal, SmallModal } from "@organisms";
import { WithSideBlock, WithModal } from "@templates";
import { useDispatch, useSelector } from "react-redux";
import { createoprydatkuvannyas, deleteoprydatkuvannya, getAlloprydatkuvannyas, updateoprydatkuvannyas } from "../store/oprydatkuvannyaPage/duck";
import moment from "moment";
import { showError } from "../utils/notification";


const formattedDate = (inputDate) => moment(inputDate, 'YYYY-MM-DD').format('DD.MM.YYYY');


const Page = () => {
  const [isShown, setIsShown] = useState(0);
  const [isShown2, setIsShown2] = useState(0);
  const [newRowData, setNewRowData] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalData2, setModalData2] = useState(null);
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

  const onDelete = (dataToDel) => () => {
    dispatch(deleteoprydatkuvannya(dataToDel));
  };

  const [newModalData2, setNewModalData2] = useState({
    id: "newID",
    // name: "Загальновійськова",
    // isSigned: false,  
    // menuRozkladkaUsage: {
    //     supplyUsedBreakfast: {},
    //     supplyUsedLunch: {},
    //     supplyUsedDiner: {},
    //     supplyAvailable: []
    //   }
  });
  const arr = useSelector((state) => state?.oprydatkuvannya?.oprydatkuvannya);
  const active = useSelector((state) => state?.oprydatkuvannya?.active);
  const tableData = useMemo(() => arr?.map(el => ({
    ...el,
    isSigned: el.documentStatus === "SIGNED",
  })), [arr]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlloprydatkuvannyas());
  }, []);

  useEffect(() => {
    setModalData(active);
    setModalData2(active);
  }, [active]);

  const createNewRecord = (body) => {
    const newID = parseInt(tableData[tableData.length-1].id) + tableData.length;
  
    if (!body?.num || !body?.date || !body?.contract || !body?.type) {
      showError("Не всі поля заповнені!");
    } else {
      dispatch(createoprydatkuvannyas({
        id: newID,
        documentCode: parseInt(tableData[tableData.length-1].documentCode) + 1,
        documentNumber: body.num,
        date: body.date,
        supplyReceivedType: body.type,
        supplyReceivedContract: body.contract,
       }));
       setModalData(tableData?.find(el=>el.id===newID));
       setModalData2(tableData?.find(el=>el.id===newID));
      return true;
    }
  };

  const openModal = (id) => () => {
    const idIfExist = tableData?.find(el=>el.id===id);
    setModalData(idIfExist || newModalData);
    setIsShown(1);
  };

  const closeModal2 = () => {
    setModalData2(null);
    setIsShown2(-1);
  };

  const closeModal1 = () => {
    setModalData(null);
    setIsShown(-1);
  };
  const onSign = () => {
    dispatch(updateoprydatkuvannyas({...modalData, documentStatus: "SIGNED"}));
    closeModal1();
  };

  const openModal2 = (id) => (event) => {
    event.preventDefault();
    const formControlsArray = [...event.target.elements];
    const formControlsObject = formControlsArray.reduce((acc, control) => {
      if (control.name) {
          acc[control.name] = control.value;
      }
      return acc;
    }, {});

    const myObj = id && tableData?.find(el=>el.id===id);
    if (!myObj) {
      const isSuccess = createNewRecord(formControlsObject);
      if (isSuccess) {
        setIsShown2(1);
      }
    } else {
      setModalData2(myObj);
      setIsShown2(1);
    }
  
  };
  const handleSubmitSmallModal = (event) => {
    event.preventDefault();
    const formControlsArray = [...event.target.elements];
    const formControlsObject = formControlsArray.reduce((acc, control) => {
      if (control.name) {
          acc[control.name] = control.value;
      }
      return acc;
    }, {});

    const objToPut = {
      supplyCode: formControlsObject.code,
      supplyName: formControlsObject.name,
      supplyUnit: formControlsObject.units || "кг",
      supplyCount: formControlsObject.factcount,
      supplyPricePerUnit: formControlsObject.price,
      startDate: formControlsObject.date,
      endDate: formControlsObject.until,
      days: formControlsObject.days,
      sum: formControlsObject.sum,
    };
    const allFields = objToPut.supplyCode && objToPut.supplyName && objToPut.supplyUnit && objToPut.supplyPricePerUnit;
    if (allFields) {
      const oldsuppl = modalData2?.supplies || [];
      const newSupplies = [...oldsuppl, objToPut];
      const body = {
        ...modalData2,
        supplies: newSupplies,
      };
      dispatch(updateoprydatkuvannyas(body));
      closeModal2();
      setModalData(tableData?.find(el=>el.id===modalData.id));
    } else {
      showError("Не всі поля заповнені!");
    }
    
  };

  const renderModalContent = useCallback(() => (
    <OprModal
      data={modalData}
      handleSubmit={openModal2}
      onClose={closeModal1}
      onSign={onSign}
      newRowData={newRowData}
      setNewRowData={setNewRowData}
    />
  ), [modalData, newRowData, closeModal1]);


  const renderModal2Content = useCallback(() => (
    <SmallModal
      data={modalData}
      handleSubmit={handleSubmitSmallModal}
      onClose={closeModal2}
      newRowData={newRowData}
      setNewRowData={setNewRowData}
    />
  ), [modalData2, newRowData, closeModal2]);

  return (
    <WithModal
      renderModalContent={renderModal2Content}
      isShown={isShown2}
      priority
      setIsShown={setIsShown2}
    >
      <WithModal
        renderModalContent={renderModalContent}
        isShown={isShown} 
        setIsShown={setIsShown}
      >
        <WithSideBlock ratio={80}>
          <Flex flexDirection="column">
            <Typography type="title" fontSize="50px" textAlign="start" margin="40px">
              {text.title.oprydatkuvannya}
            </Typography>
            <Table2 rows={tableData} openModal={openModal} onDelete={onDelete} />
            <Flex justifyContent="end" margin="40px">
              <Button styleType="primary" width="35%" onClick={openModal()}>
                {text.button.add}
              </Button>
            </Flex>
          </Flex>
        </WithSideBlock>
      </WithModal>
    </WithModal>
  );
  
};

export default Page;