import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';

import Header from '../components/header';
import Game from './game';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Pages = () => (
  <Container>
    <Header />
    <Content>
      <Game />
    </Content>
    <ToastContainer />
  </Container>
);

export default Pages;
