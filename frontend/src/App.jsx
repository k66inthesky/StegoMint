// frontend/src/App.jsx
import { useState } from 'react'
import './App.css'

// 1. Import image (make sure path is correct)
import logo from './assets/logo.png' 

import Sudoku from './components/Sudoku'
import Wallet from './components/Wallet'
import BtcTransfer from './components/BtcTransfer'

function App() {
  const [mode, setMode] = useState('GAME');
  const [walletType, setWalletType] = useState('GOD_MODE');

  const handleUnlock = (type) => {
    console.log("Switching interface, mode:", type);
    setWalletType(type);
    setMode('WALLET');
  };

  return (
    <div className="app">
      {/* 2. Originally text h1, now replaced with Logo image */}
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <img 
          src={logo} 
          alt="StegoMint Logo" 
          style={{ 
            maxWidth: '200px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.2))'
          }} 
        />
      </header>

      <div className="card">
        {mode === 'GAME' ? (
          <Sudoku onUnlock={handleUnlock} />
        ) : (
          <div className="wallet-container">
            {walletType === 'GOD_MODE' ? (
              <BtcTransfer />
            ) : (
              <Wallet type={walletType} />
            )}
            
            <button 
              onClick={() => setMode('GAME')}
              style={{ marginTop: '20px', padding: '8px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Return to Lock Screen (Demo)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App