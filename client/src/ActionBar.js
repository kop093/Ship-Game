import React from "react";
import styled from "styled-components";

const ActionBar = (props) => {
  let { game } = props;
  return (
    <ActionBarWrapper>
      <h1>Instruction:</h1>
      <p>Click on grid to move</p>
      <p> --------------</p>
      <h1>Target:</h1>
      <p>Get the key from an enemy ship to proceed</p>
      <Space>Items</Space>
      <p>canon ball: {game.canonOnShip}</p>
    </ActionBarWrapper>
  );
};

const ActionBarWrapper = styled.div`
  background-color: lightskyblue;

  width: 200px;
  border: 1px solid;
  border-right: 4px solid;
  border-bottom: 3px solid;
  top: 10px;
  z-index: 10;
`;

const Space = styled.h1`
  padding-top: 20px;
`;

export default ActionBar;
