/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';

import styled from 'styled-components';

import { CONTRACT_ADDRESS } from '../constants/contract';
import { verifyByWeb3 } from '../utils/verify_helper';
import Board from './board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export enum Status {
  NONE,
  LOADING,
  FOUND,
  NOT_FOUND,
}

const Game = () => {
  const [goldX, setGoldX] = useState(0);
  const [goldY, setGoldY] = useState(0);
  const [status, setStatus] = useState<Status>(Status.NONE);

  const handleSelect = async (x: number, y: number) => {
    setGoldX(x);
    setGoldY(y);

    setStatus(Status.LOADING);
    const res = await verifyByWeb3(CONTRACT_ADDRESS, x, y);
    setStatus(res ? Status.FOUND : Status.NOT_FOUND);
  };

  return (
    <Container>
      <h2>Please select the gold position to check!</h2>
      <Board onSelect={handleSelect} status={status} x={goldX} y={goldY} />
    </Container>
  );
};

export default Game;
