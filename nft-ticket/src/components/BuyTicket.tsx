import React, { useState } from 'react';
import Web3 from 'web3';
import TicketSalesABI from '../contract/TicketSalesABI.json';

const contractAddress = "";
const infuraUrl = ``;

const userAccount = "";
const privateKey = "";

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const BuyTicketComponent: React.FC = () => {
  const [cid, setCid] = useState('');
  const [message, setMessage] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const buyTicket = async (cid: string): Promise<void> => {
    setMessage('');
    try {
      const ticketSalesContract = new web3.eth.Contract(TicketSalesABI, contractAddress);
      const data = ticketSalesContract.methods.buyTicket(cid).encodeABI();

      const nonce = await web3.eth.getTransactionCount(userAccount, 'latest');
      const gasPrice = await web3.eth.getGasPrice();
      const estimatedGas = await ticketSalesContract.methods.buyTicket(cid).estimateGas({from: userAccount});

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
    <div>
      <input
        type="text"
        value={`ipfs://${cid}`}
        onChange={(e) => setCid(e.target.value.replace(/^ipfs:\/\//, ''))}
        placeholder="CID 입력"
      />
      <button onClick={() => buyTicket(cid)}>티켓 구매</button>
      {message && <p>{message}</p>}
      {transactionHash && (
        <div>
          <a href={etherscanUrl} target="_blank" rel="noopener noreferrer">Etherscan에서 트랜잭션 확인</a>
        </div>
      )}
    </div>
  );
};

export default BuyTicketComponent;
