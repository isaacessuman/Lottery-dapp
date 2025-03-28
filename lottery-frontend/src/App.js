import React, { useEffect, useState } from 'react';
import { connectWallet, getContract } from './utils/contract';
import { ethers } from 'ethers';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [prizePool, setPrizePool] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      setConnected(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      console.error('Error connecting wallet:', error);
    }
  };

  const fetchData = async () => {
    try {
      const contract = getContract();
      const pool = await contract.prizePool();
      setPrizePool(ethers.formatEther(pool));

      const participantCount = await contract.participants.length();
      const participantsList = [];
      for (let i = 0; i < participantCount; i++) {
        const participant = await contract.participants(i);
        participantsList.push(participant);
      }
      setParticipants(participantsList);

      setLoading(false);
    } catch (error) {
      setErrorMessage('Error fetching data. Check console for details.');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchData();
    }
  }, [connected]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Lottery DApp</a>
          <button
            className="btn custom-btn"
            onClick={handleConnectWallet}
            disabled={connected}
          >
            {connected ? `Connected: ${walletAddress.slice(0, 6)}...` : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <h1 className="text-center text-primary">Welcome to the Lottery DApp</h1>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <h3 className="text-center">Prize Pool: {prizePool} STT</h3>
            <h4 className="text-center">Participants:</h4>
            <ul className="list-group mt-3">
              {participants.map((participant, index) => (
                <li key={index} className="list-group-item">
                  {participant}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default App;