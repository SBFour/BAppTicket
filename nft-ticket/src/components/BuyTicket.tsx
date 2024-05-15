import React, { useState } from 'react';
import Web3 from 'web3';
import TicketSalesABI from '../contract/TicketSalesABI.json';
import styled from 'styled-components';

const contractAddress = "0x68beCEd9fBb81A0d0469e00F45f11d18eaB28Cee";
const infuraUrl = ` `;
const userAccount = " ";
const privateKey = " ";
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

interface BuyTicketProps {
  cid: string;
}

const BuyTicketComponent: React.FC<BuyTicketProps> = ({ cid }) => {
  const [message, setMessage] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const buyTicket = async () => {
    setMessage('');
    try {
      const ticketSalesContract = new web3.eth.Contract(TicketSalesABI, contractAddress);
      const data = ticketSalesContract.methods.buyTicket(cid).encodeABI();

      const nonce = await web3.eth.getTransactionCount(userAccount, 'latest');
      const gasPrice = await web3.eth.getGasPrice();
      const estimatedGas = await ticketSalesContract.methods.buyTicket(cid).estimateGas({ from: userAccount });

      const adjustedGasPrice = Math.floor(Number(gasPrice) * 1.10);
      const maxPriorityFeePerGas = web3.utils.toWei('1', 'gwei');
      const maxFeePerGas = adjustedGasPrice;

      const transaction = {
        'to': contractAddress,
        'value': 0,
        'gas': estimatedGas,
        'nonce': nonce,
        'data': data,
        'maxPriorityFeePerGas': maxPriorityFeePerGas,
        'maxFeePerGas': maxFeePerGas.toString(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      setTransactionHash(receipt.transactionHash.toString());
      setMessage(`티켓 구매가 완료되었습니다! 트랜잭션: ${receipt.transactionHash}`);
    } catch (error) {
      setMessage('티켓 구매 중 에러가 발생했습니다.');
    }
  };

  const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;
  return (
    <Container>
      <PosterSection>
        <Title>세븐틴 공연!</Title>
        <Poster src="https://fuchsia-rainy-porpoise-241.mypinata.cloud/ipfs/QmcVcmP9r7NaAoJeJKkJvamznEeMTaocJvfha9Vd9Wg6yd" alt="Concert Poster" />
      </PosterSection>
      <FormSection>
        <Button onClick={buyTicket}>📟 티켓 구매</Button>
        {message && <Message>{message}</Message>}
        {transactionHash && (
          <div>
            <a href={etherscanUrl} target="_blank" rel="noopener noreferrer">🧫 Etherscan에서 트랜잭션 확인</a>
          </div>
        )}
      </FormSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  width: 100%;
`;

const PosterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Poster = styled.img`
  width: 500px;
  height: auto;
  margin-bottom: 20px;
`;

const Message = styled.p`
  color: green;
  font-size: 16px;
`;

export default BuyTicketComponent;
