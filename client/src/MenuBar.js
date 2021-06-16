import React from "react";
import styled from "styled-components";
import MenuButton from "./MenuButton";

const MenuBar = (props) => {
  let { game } = props;
  return (
    <MenuBarWrapper>
      <Title>Adventures of an Unlucky Merchant</Title>
      <Level>Level: {game.level}</Level>
      {/* <MenuButton></MenuButton> */}
    </MenuBarWrapper>
  );
};

const MenuBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: lightsalmon;
  height: 50px;
  padding-top: 10px;
  width: 1200px;
`;
const Title = styled.h1`
  font-size: 30px;
  margin-right: 80px;
`;
const Level = styled.h1``;

export default MenuBar;
