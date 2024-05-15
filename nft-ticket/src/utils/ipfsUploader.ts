import axios from 'axios';

export const uploadToIPFS = async (
  NickName: string,
  eventDate: string
): Promise<string | null> => {
  const metadata = {
    name: `NFT Ticket`,
    description: "An NFT Ticket",
    image: "ipfs://QmPD5hMzWh2VS8spPBMqdGPmxUxqH4mmx9iaaEiF26uqRx",
    attributes: [
      {
        trait_type: "NickName",
        value: NickName
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
        'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY || ' ',
        'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET_API_KEY || ' ',
        'Content-Type': 'multipart/form-data'
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return null;
  }
};
