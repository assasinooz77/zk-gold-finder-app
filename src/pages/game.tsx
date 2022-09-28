/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { Button } from 'antd';
import styled from 'styled-components';

import { useWallet } from '../contexts/wallet_context';
import Board from './board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Game = () => {
  const { account } = useWallet();

  const [goldX, setGoldX] = useState(0);
  const [goldY, setGoldY] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleSelect = (x: number, y: number) => {
    setGoldX(x);
    setGoldY(y);
    setSelected(true);
  };

  return (
    <Container>
      <h2>Please place your gold!</h2>
      <Board onSelect={handleSelect} selected={selected} x={goldX} y={goldY} />
      <br />
      {!account && <h3>Please connect your wallet!</h3>}
      <Button disabled={!selected || !account}>Start Game</Button>
    </Container>
  );
};

export default Game;
