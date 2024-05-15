import React, { useState } from 'react';
import styled from 'styled-components';
import Ipfs from '../components/ipfs';
import BuyTicket from '../components/BuyTicket';

function Ticket() {
  const [cid, setCid] = useState('');

  return (
    <MainContainer>
      <ComponentWrapper>
        <Ipfs setCid={setCid} />
      </ComponentWrapper>
      <ComponentWrapper>
        <BuyTicket cid={cid} />
      </ComponentWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Arial', sans-serif;
  margin-top: 200px;
  width: 100%;
`;

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;

export default Ticket;
