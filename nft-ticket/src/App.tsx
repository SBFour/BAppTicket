import React, { useState } from 'react';
import Ipfs from './components/ipfs';
import BuyTicket from './components/BuyTicket';  
function App() {


  return (
    <div>
      <Ipfs />
        <p>
          티켓 구매하기
        </p>
        <BuyTicket />
    </div>
  );
};

export default App;
