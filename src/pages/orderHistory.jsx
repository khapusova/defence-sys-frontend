import React, { useCallback, useEffect, useMemo, useState } from "react";
import text from '@text';
import { Typography, Button, Flex } from "@atoms";
import { Table, AccountingModal } from "@organisms";
import { WithSideBlock, WithModal } from "@templates";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllorders, updateOrcreateOrder } from "../store/orderPage/duck";
import { OrderModal } from "../components/organisms";
import { Image, Input } from "../components/atoms";
import deleteIcon from "@public/delete.svg";
import { showError } from "../utils/notification";
import moment from "moment";


const formattedDate = (inputDate) => moment(inputDate, 'YYYY-MM-DD').format('DD.MM.YYYY');
function addDaysToDate(originalDate, numberOfDays) {
  // Split the original date string into day, month, and year
  const [day, month, year] = originalDate.split('.');

  // Create a JavaScript Date object
  const dateObject = new Date(`${year}-${month}-${day}`);

  // Add the desired number of days
  dateObject.setDate(dateObject.getDate() + numberOfDays);

  // If the month has changed, adjust the month accordingly
  if (dateObject.getMonth() !== parseInt(month, 10) - 1) {
      dateObject.setMonth(parseInt(month, 10) - 1);
  }

  // Format the resulting date as "dd.mm.yyyy"
  const resultDate = `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`;

  return resultDate;
}

const SmallOrderModal = ({ onClose, handleSubmit }) => (
  <Flex flexDirection="column" padding="10px" border="3px solid" width="100%" as="form" id="smallform" onSubmit={handleSubmit}>
    <Image
          src={deleteIcon}
          onClick={onClose}
          style={{ cursor: 'pointer' }}
          width="30px"
          height="30px"
          alignSelf="end"
        />
    <Typography textAlign="center" fontSize="20px">Додати продукт</Typography>
    <Flex padding="10px" justifyContent="space-between">
      <Typography marginBottom="10px">Продукт: </Typography>
      <Input
        backgroundColor="#DACDA3"
        border="3px solid"
        name="food"
      />
    </Flex>
    <Flex padding="10px" justifyContent="space-between">
      <Typography marginBottom="10px">Вага на одну порцію(кг): </Typography>
      <Input
        backgroundColor="#DACDA3"
        border="3px solid"
        name="formeal"
        type="number"
        step="0.001"
      />
    </Flex>
    <Flex padding="10px" justifyContent="space-between">
      <Typography marginBottom="10px">Вартість за 1 кг: </Typography>
      <Input
        name="price"
        type="number"
        backgroundColor="#DACDA3"
        border="3px solid"
        step="0.001"
      />
    </Flex>
    <Button type="submit" backgroundColor="#AB904A">{text.button.add}</Button>
  </Flex>
);


const Page = () => {
  const [isShown, setIsShown] = useState(0);
  const [isShown2, setIsShown2] = useState(0);

  const [newRowData, setNewRowData] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalData2, setModalData2] = useState(null);
  const dispatch = useDispatch();
  const [daysData, setDaysData] = useState(null);
  const arr = useSelector((state) => state.order.order);

  const [requiredData, setRequiredData] = useState({
    startDate: null,
    days: null,
  });

  const table2Data = useMemo(() => {
    if (!requiredData.days || !requiredData.startDate) {
      return null;
    }
    const startDateObject = new Date(requiredData.startDate);
    const dateArray = Array.from({ length: requiredData.days }, (_, index) => {
        const newDate = new Date(startDateObject);
        newDate.setDate(startDateObject.getDate() + index);
        const formattedDate = newDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return formattedDate;
    });

    if (!daysData) {
      if (modalData?.order) {
        setDaysData(modalData.order);
      } else {
        const daysDat = {};
        dateArray?.forEach((el) => {
          daysDat[el] = {
            breakfast: {},
            lunch: {},
            dinner: {},}
        });
        setDaysData(daysDat);
      }
    } else {
      const daysDat = {...daysData};
 
      dateArray?.forEach((el) => {
        if (!daysDat[el]) {
          daysDat[el] = {
            breakfast: {},
            lunch: {},
            dinner: {},
          }
        }
      });
      Object.keys(daysData)?.forEach(k => {
        if (!dateArray.includes(k)) {
          delete daysDat[k];
        }
      })
      setDaysData(daysDat);
    }
    return dateArray;
  }, [requiredData]);

  const onDelete = (dataToDel) => () => {
    dispatch(deleteOrder(dataToDel));
  };

  const tableData = useMemo(() => arr.map(
    el => ({
      ...el,
      isSigned: el.orderStatus === "SIGNED",
      isSent: el.orderStaus === "SENT",
      id: el.orderId,
      name: el.orderName,
    })
  ), [arr]);
  const openModal = (id) => () => {
    setModalData(tableData.find(el => el.id === id) || {id: "newID"});
    setIsShown(1);
  };

  const openModal2 = (date, time) => () => {
    setModalData2({date, time});
    setIsShown2(1);
  };


  useEffect(() => {
    dispatch(getAllorders());
  }, []);

  useEffect(() => {
      if (modalData?.order) {
        setDaysData(modalData.order);
      }
      setTimeout(() => setRequiredData({ startDate: modalData?.startDate, days: modalData?.daysCount }), 1000)
  }, [modalData]);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(event.target.elements);
  };
  
  const submitSml = (event) => {
    event.preventDefault();
    const formControlsArray = [...event.target.elements];
    
    const formControlsObject = formControlsArray.reduce((acc, control) => {
      if (control.name && control.name !== "vsob" && control.name !== "vssn" && control.name !== "vsvch" && control.name !== "result") {
          acc[control.name] = control.value;
      }
      return acc;
    }, {});

    if (!formControlsObject.formeal  || !formControlsObject.price || ! formControlsObject.food) {
      showError('Не всі поля заповнені!');
    } else {
      const myObj = {
        supplyName: formControlsObject.food,
        supplyPerMeal: formControlsObject.formeal,
        supplyPricePerKG: formControlsObject.price,
      };
      if (modalData2?.date) {
        setDaysData(prev => {
          const dat = {...prev};
          dat[modalData2.date][modalData2.time].food = dat[modalData2.date][modalData2.time].food ? [...dat[modalData2.date][modalData2.time].food, myObj] : [myObj];
          return dat;
        });
        setIsShown2(-1);
        document.getElementById("smallform").reset();
      }
    }
  };

  const onDaysChange = (event) => {
    setRequiredData((prev) => ({...prev, days: event.target.value}));
  };

  const onStartDateChane = (event) => {
    setRequiredData((prev) => ({...prev, startDate: event.target.value}));
  };

  const onSign = (isSigned) => () => {
    const form = document.getElementById('mainorderform');
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
        const newid =  modalData?.id === "newID" ? parseInt(tableData[tableData.length-1]?.id) + tableData.length : modalData?.id
        const newObj = {
          adress: formValues.adress,
          contract: parseInt(formValues.contract),
          daysCount: parseInt(formValues.days),
          deadlineDate: formValues.deadline,
          reason: formValues.reason,
          startDate: formValues.startdate,
          orderId: newid,
          id: newid,
          orderName: `Замовлення ${formattedDate(formValues.startdate)} - ${addDaysToDate(formattedDate(formValues.startdate), parseInt(formValues.days))}`,
          orderStatus: isSigned? "SIGNED" : "UNSIGNED",
          order: daysData,
        };
        dispatch(updateOrcreateOrder(newObj));
        setIsShown(-1);
        setModalData(null)
    }
  };

  const renderModalContent = useCallback((onClose) => (
    <OrderModal
      data={modalData}
      required={requiredData}
      openModal2={openModal2}
      onSign={onSign}
      onStartDateChane={onStartDateChane}
      onDaysChange={onDaysChange}
      handleSubmit={handleSubmit}
      onClose={() => {
        onClose();
        setModalData(null);
      }}
      newRowData={newRowData}
      setNewRowData={setNewRowData}
      daysData={daysData}
      setDaysData={setDaysData}
    />
  ), [modalData, newRowData, daysData,modalData2, requiredData]);

  const renderModal2Content = useCallback((onClose) => (
    <SmallOrderModal onClose={() => {
      onClose();
      document.getElementById("smallform").reset();
    }} handleSubmit={submitSml} />
  ), [modalData, newRowData, modalData2]);


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
        lagre
        setIsShown={setIsShown}
      >
        <WithSideBlock ratio={80}>
          <Flex flexDirection="column">
            <Flex alignItems="center">
              <Typography type="title" fontSize="40px" textAlign="start" margin="40px">
                {text.title.history}
              </Typography>
              <Button styleType="primary" height="fit-content" flex="0" fontSize="20px" onClick={openModal()}>
                {text.button.createOrder}
              </Button>
            </Flex>
            <Table rows={tableData} openModal={openModal} isHistory onDelete={onDelete} />
            <Flex justifyContent="end" margin="40px">
              
            </Flex>
          </Flex>
        </WithSideBlock>
      </WithModal>
    </WithModal>
  );
  
};

export default Page;