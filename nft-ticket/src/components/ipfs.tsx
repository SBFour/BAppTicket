import React, { useState } from 'react';
import { uploadToIPFS } from '../utils/ipfsUploader';

const Ipfs = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [cid, setCid] = useState('');  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ipfsUrl = await uploadToIPFS(eventName, eventDate);
    if (ipfsUrl) {
      console.log('IPFS URL:', ipfsUrl);
      setCid(ipfsUrl);  
    } else {
      console.error('Failed to upload to IPFS');
      setCid('');  
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <button type="submit">Ipfs</button>
      </form>
      {cid && ( 
        <div>
          <p>CID: {cid}</p>
        </div>
      )}
    </div>
  );
};

export default Ipfs;
