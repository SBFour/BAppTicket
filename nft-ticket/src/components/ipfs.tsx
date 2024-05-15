import React, { useState } from 'react';
import { uploadToIPFS } from '../utils/ipfsUploader';
import styled from 'styled-components';

interface IpfsProps {
  setCid: (cid: string) => void;
}

const Ipfs: React.FC<IpfsProps> = ({ setCid }) => {
  const [NickName, setNickName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ipfsUrl = await uploadToIPFS(NickName, eventDate);
    if (ipfsUrl) {
      console.log('IPFS URL:', ipfsUrl);
      setCid(ipfsUrl);
    } else {
      console.error('Failed to upload to IPFS');
      setCid('');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>✅ 성명:</Label>
        <Input
          type="text"
          value={NickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <Label>📅 이벤트 날짜:</Label>
        <Input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Button type="submit">내 정보 업로드</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  width: 100%;
  margin-top: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 90%;
  border-radius: 5px;
  border: 1px solid #ccc;
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

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
`;

export default Ipfs;
