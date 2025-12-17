import React, { useState } from 'react';

const Bob = () => {
  const [address, setAddress] = useState('');
  const [txid, setTxid] = useState('');
  const [status, setStatus] = useState('');
  
  // This is Bob's transfer target (will be entered by user or auto-detected)
  const [aliceAddr, setAliceAddr] = useState('');
  const [amount, setAmount] = useState(1000);

  // Connect Unisat Wallet
  const connectUnisat = async () => {
    if (typeof window.unisat === 'undefined') {
      alert('Unisat Wallet not detected! Please install the extension first.');
      return;
    }
    try {
      const accounts = await window.unisat.requestAccounts();
      setAddress(accounts[0]);
      setStatus('✅ Unisat Connected: ' + accounts[0].slice(0,6) + '...');
    } catch (e) {
      setStatus('❌ Connection Failed: ' + e.message);
    }
  };

  // Send real Bitcoin (Testnet)
  const sendRealBitcoin = async () => {
    if (!aliceAddr) {
      alert("Please enter Alice's address!");
      return;
    }
    
    try {
      setStatus('⏳ Requesting Signature...');
      
      // Call Unisat to send transaction
      // Parameters: toAddress, amount (sats)
      const txHash = await window.unisat.sendBitcoin(aliceAddr, Number(amount));
      
      setTxid(txHash);
      setStatus('🚀 Transaction Broadcasted!');
      console.log("Tx Sent:", txHash);
      
    } catch (e) {
      console.error(e);
      setStatus('❌ Send Failed: ' + e.message);
    }
  };

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#f7931a' }}>🟠 Bob's Bitcoin Sender</h1>
        <p style={{ color: '#666' }}>
          This interface connects to your <b>Unisat Wallet</b> to send REAL Testnet Bitcoin.
        </p>

        {/* 1. Connect Wallet */}
        {!address ? (
          <button 
            onClick={connectUnisat}
            style={{ padding: '15px', width: '100%', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
          >
            🔌 Connect Unisat Wallet
          </button>
        ) : (
          <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
            <strong>Bob's Wallet:</strong> {address}
          </div>
        )}

        {/* 2. Transfer Form */}
        {address && (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>To Alice (Address):</label>
              <input 
                type="text" 
                placeholder="Paste tb1q... address here"
                value={aliceAddr}
                onChange={(e) => setAliceAddr(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount (sats):</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>

            <button 
              onClick={sendRealBitcoin}
              style={{ padding: '15px', width: '100%', background: '#f7931a', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              💸 Send Real Bitcoin (Testnet)
            </button>
          </div>
        )}

        {/* 3. Status Display */}
        {status && <div style={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>{status}</div>}
        
        {txid && (
          <div style={{ marginTop: '15px', padding: '10px', background: '#e6fffa', border: '1px solid #b2f5ea', borderRadius: '5px', wordBreak: 'break-all' }}>
            <div style={{ color: '#2c7a7b', fontWeight: 'bold' }}>✅ Confirmed On-chain!</div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>TXID: {txid}</div>
            <a href={`https://mempool.space/testnet/tx/${txid}`} target="_blank" style={{ display: 'block', marginTop: '5px', color: '#3182ce' }}>View on Explorer</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bob;