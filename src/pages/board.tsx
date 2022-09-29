/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import { Status } from './game';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cell = styled.div<{ selected?: boolean; status: Status }>`
  width: 50px;
  height: 50px;
  border-radius: 2px;
  border: 1px solid black;
  margin: 2px;
  cursor: ${({ status }) => (status === Status.LOADING ? 'not-allowed' : 'pointer')};
  background: ${({ selected, status }) =>
    selected && status !== Status.NONE
      ? status === Status.LOADING
        ? 'yellow'
        : status === Status.FOUND
        ? 'blue'
        : 'red'
      : 'white'};
`;

const ROW = 3;
const COLUMN = 3;

interface IBoard {
  status: Status;
  x: number;
  y: number;
  onSelect: (x: number, y: number) => void;
}

const Board: React.FC<IBoard> = ({ status, x, y, onSelect }) => (
  <Container>
    {new Array(ROW).fill(0).map((_, key1) => (
      <Row key={key1}>
        {new Array(COLUMN).fill(0).map((_, key2) => (
          <Cell
            key={key2}
            onClick={() => status !== Status.LOADING && onSelect(key1, key2)}
            selected={x === key1 && y === key2}
            status={status}
          />
        ))}
      </Row>
    ))}
  </Container>
);

export default Board;
