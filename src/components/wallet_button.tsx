import { Button } from 'antd';
import styled from 'styled-components';

import { useWallet } from '../contexts/wallet_context';
import { getShortWalletAddress } from '../utils';

const Container = styled.div`
  position: relative;

  button {
    white-space: nowrap;
    font-size: 1.2rem;
  }
`;

const WalletButton = () => {
  const { account, connect, disconnect } = useWallet();

  const handleClick = () => {
    if (account) {
      disconnect();
    } else {
      connect('METAMASK');
    }
  };

  return (
    <Container>
      <Button onClick={handleClick}>{account ? getShortWalletAddress(account) : 'Connect'}</Button>
    </Container>
  );
};

export default WalletButton;
