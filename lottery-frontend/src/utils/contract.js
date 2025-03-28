import { ethers } from 'ethers';
import contractABI from './contractABI'; 
import Web3Modal from 'web3modal';

const CONTRACT_ADDRESS = '0x747B5CdE93c8a6e0Ec1BE73574d7CC16DAb49Cb3';

const web3Modal = new Web3Modal({
  cacheProvider: true, // Cache the provider for faster reconnects
});

let provider;
let signer;
let contract;

export const connectWallet = async () => {
  try {
    provider = await web3Modal.connect();
    signer = new ethers.BrowserProvider(provider).getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    return signer.getAddress();
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export const getContract = () => {
  if (!contract) {
    throw new Error('Contract not initialized. Call connectWallet() first.');
  }
  return contract;
};