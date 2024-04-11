import axios from 'axios';

export const uploadToIPFS = async (
  eventName: string,
  eventDate: string
): Promise<string | null> => {
  const metadata = {
    name: `${eventName} NFT Ticket`,
    description: "An NFT Ticket",
    image: "ipfs://QmPD5hMzWh2VS8spPBMqdGPmxUxqH4mmx9iaaEiF26uqRx",
    attributes: [
      {
        trait_type: "Event Name",
        value: eventName
      },
      {
        trait_type: "Event Date",
        value: eventDate
      }
    ]
  };

  const formData = new FormData();
  formData.append('file', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY || 'ee9381ca6ffb0150c02e',
        'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY || '11af60904e1756cae14c2f000e4b92b47e36f62334abdfbe4bf3191f45e306f5',
        'Content-Type': 'multipart/form-data'
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return null;
  }
};
