import { useMemo, useState } from "react";
import { Button, Flex, Input, Typography } from "../components/atoms";
import HidePassword from '@public/hidePassword.png';
import ShowPassword from '@public/showPassword.png';
import { useDispatch } from "react-redux";
import { login } from "../store/authorization/duck";
import { showError } from "../utils/notification";
import { ROUTES } from "../constants";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordInputType = useMemo(
    () => (isPasswordShown ? 'text' : 'password'),
    [isPasswordShown]
  );
  const onEyeButtonClick = () => {
    setIsPasswordShown((prev) => !prev);
  };
  const EyeIcon = useMemo(
    () => (
      <img
        alt={isPasswordShown ? 'Hide Password' : 'Show Password'}
        src={isPasswordShown ? HidePassword : ShowPassword}
        width="30px"
        height="30px"
      />
    ),
    [isPasswordShown]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const formControlsArray = [...event.target.elements];
    
    const formControlsObject = formControlsArray.reduce((acc, control) => {
      if (control.name) {
          acc[control.name] = control.value;
      }
      return acc;
    }, {});

    if (!formControlsObject.passw  || !formControlsObject.email || formControlsObject.passw.length === 0  || formControlsObject.email.length === 0) {
      showError('Не всі поля заповнені!');
    } else {
      const body = {
        email: formControlsObject.email,
        password: formControlsObject.passw,
      };
      dispatch(login(body)).then((resp) => {
        if (resp?.error) {
          showError("Неправильний логін або пароль!");
        } else {
          navigate(ROUTES.root);
        }
      })
    }
  };


  return (
    <>
    <Typography textAlign="center" fontSize="80px" marginTop="50px">Вхід в систему</Typography>
    <Flex as="form" flexDirection="column" width="800px" margin="50px auto" onSubmit={onSubmit}>
      <Flex justifyContent="space-between" marginBottom="40px">
        <Typography fontSize="20px">Логін:</Typography>
        <Input
          type="text"
          name="email"
          minWidth="546px"
          fontSize="20px"
          border="3px solid"
          backgroundColor="#DACDA3"
          width="546px"
          height="30px"
        />
      </Flex>
      <Flex justifyContent="space-between">
        <Typography fontSize="20px">Пароль:</Typography>
        <Flex position="relative" width="550px" border="3px solid" backgroundColor="#DACDA3">
          <Input
            id="passw"
            border="none"
            name="passw"
            backgroundColor="#DACDA3"
            minWidth="500px"
            fontSize="20px"
            width="500px"
            height="30px"
            type={passwordInputType}
          />
          <Flex
            onClick={onEyeButtonClick}
            style={{ position: 'absolute', right: 0, top: '50%', transform: "translate(-25%, -50%)", cursor: "pointer" }}
          >
            {EyeIcon}
          </Flex>
        </Flex>
      </Flex>
      <Button styleType="primary" marginTop="80px" type="submit">Вхід</Button>
    </Flex>
    </>
  );
};

export default Page;