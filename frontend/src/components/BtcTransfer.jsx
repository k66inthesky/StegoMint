import { useState } from 'react';

export default function BtcTransfer() {
  // --- State Management ---
  const [connected, setConnected] = useState(false);
  // 1. Ensure initial value is empty string, not a hardcoded address
  const [account, setAccount] = useState('');
  
  // Bob's input data
  const [aliceAddress, setAliceAddress] = useState('');
  const [amountSats, setAmountSats] = useState(1000); 
  
  // Transaction status
  const [txId, setTxId] = useState('');
  const [status, setStatus] = useState(''); 

  // --- Connect Wallet Function ---
  const connectWallet = async () => {
    if (typeof window.unisat === 'undefined') {
      alert('UniSat Wallet not detected! Please install the extension first.');
      return;
    }

    try {
      setStatus('Connecting to wallet...');
      
      // Call UniSat API to request authorization (this will open wallet popup)
      const accounts = await window.unisat.requestAccounts();
      
      // Ensure account is retrieved
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]); // Write detected address to state
        setConnected(true);
        setStatus('');
        
        // Check and switch network (optional, keep as needed)
        const network = await window.unisat.getNetwork();
        if (network !== 'testnet') {
          try {
            await window.unisat.switchNetwork('testnet');
          } catch (e) {
            console.error(e);
          }
        }
      } else {
        setStatus('User rejected connection or no account found');
      }
    } catch (e) {
      console.error(e);
      setStatus('Connection failed: ' + e.message);
    }
  };

  // --- 2. Disconnect Function (reset all states) ---
  const handleDisconnect = () => {
    console.log('Disconnecting...');
    setConnected(false);
    setAccount('');        // Clear address
    setTxId('');          // Clear transaction record
    setStatus('');        // Clear status message
    // Note: Web3 wallets cannot be "force locked" via webpage,
    // but this will reset the UI to logged-out state.
  };

  // --- Transfer Function ---
  const handleTransfer = async () => {
    if (!aliceAddress) {
      alert('Please enter Alice\'s address!');
      return;
    }
    if (amountSats <= 0) {
      alert('Amount must be greater than 0!');
      return;
    }

    try {
      setStatus('Waiting for wallet signature...');
      setTxId(''); 

      const txHash = await window.unisat.sendBitcoin(aliceAddress, amountSats);
      
      setTxId(txHash);
      setStatus('Transfer successful!');
      console.log('TxHash:', txHash);
    } catch (e) {
      console.error(e);
      setStatus('Transaction failed or rejected: ' + e.message);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff', color: '#333' }}>
      <h2 style={{ textAlign: 'center', color: '#d97706' }}>Bob Transfer to Alice (BTC)</h2>

      {/* --- Not Connected State --- */}
      {!connected ? (
        <div style={{ textAlign: 'center' }}>
          <p>Please connect Bob's UniSat Wallet first</p>
          <button
            onClick={connectWallet}
            style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
          >
            Connect UniSat Wallet
          </button>
          <p style={{ color: 'red', fontSize: '12px', minHeight: '20px' }}>{status}</p>
        </div>
      ) : (
        /* --- Connected State --- */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Display detected address and disconnect button */}
          <div style={{ background: '#f3f4f6', padding: '10px', borderRadius: '5px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <span style={{ wordBreak: 'break-all', flex: 1 }}>
              <strong>Bob Address:</strong> {account}
            </span>
            <button
              onClick={handleDisconnect}
              style={{ backgroundColor: '#ef4444', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              Disconnect
            </button>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Alice's Testnet Address</label>
            <input
              type="text"
              placeholder="tb1q..."
              value={aliceAddress}
              onChange={(e) => setAliceAddress(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount (Satoshis)</label>
            <input
              type="number"
              value={amountSats}
              onChange={(e) => setAmountSats(Number(e.target.value))}
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>100,000,000 Sats = 1 BTC</p>
          </div>

          <button
            onClick={handleTransfer}
            style={{ backgroundColor: '#d97706', color: 'white', padding: '12px', borderRadius: '5px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}
          >
            Confirm Transfer
          </button>

          {/* Status Display */}
          {status && (
            <p style={{ textAlign: 'center', color: status.includes('failed') ? 'red' : 'green' }}>
              {status}
            </p>
          )}

          {txId && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '5px', textAlign: 'center' }}>
              <p style={{ color: '#047857', fontWeight: 'bold', margin: '0 0 5px 0' }}>Transaction Sent!</p>
              <a
                href={`https://mempool.space/testnet/tx/${txId}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563eb', fontSize: '12px', wordBreak: 'break-all' }}
              >
                View Transaction Details
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}