/* eslint-disable react/no-array-index-key */
import React from 'react';

import styled from 'styled-components';

import WalletButton from './wallet_button';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  height: 6.25rem;
  box-sizing: border-box;
`;

const Header: React.FC = () => (
  <Container>
    <h2>ZK Gold Finder</h2>
    <WalletButton />
  </Container>
);

export default Header;
