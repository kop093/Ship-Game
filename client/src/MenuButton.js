import React from "react";
import styled from "styled-components";

const MenuButton = () => {
  let pause = true;
  return (
    <MenuButtonWrapper>
      <Button classNames="Continue">{pause ? "Pause" : "Continue"}</Button>
      <Button classNames=" Restart">Restart</Button>
    </MenuButtonWrapper>
  );
};
const MenuButtonWrapper = styled.div`
  display: absolute;
  margin-left: 350px;
  margin-top: 8px;
`;

const Button = styled.button`
  margin-left: 10px;
`;
export default MenuButton;
