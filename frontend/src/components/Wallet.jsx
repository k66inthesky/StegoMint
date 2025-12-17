// src/components/Wallet.jsx
// This is Alice's DURESS MODE wallet - a decoy shown when under coercion
// The attacker sees an empty wallet and believes there's nothing to steal

export default function Wallet() {
  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center', 
      color: '#555',
      border: '1px dashed #ccc',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {/* Duress Mode Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0 0 5px 0' }}>💼 Duress Mode (Alice's Wallet)</h2>
        <span style={{ 
          fontSize: '12px', 
          color: '#888', 
          background: '#e0e0e0', 
          padding: '2px 8px', 
          borderRadius: '10px' 
        }}>
          Public View
        </span>
      </div>

      {/* Fake Balance Display */}
      <div style={{ 
        fontSize: '48px', 
        fontWeight: 'bold',
        margin: '30px 0',
        color: '#666'
      }}>
        $ 0.00
      </div>

      <div style={{ 
        padding: '15px', 
        background: '#fff', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <p style={{ margin: '0 0 10px 0', color: '#999', fontSize: '14px' }}>
          Bitcoin Balance
        </p>
        <p style={{ margin: '0', fontSize: '24px', color: '#333' }}>
          0.00000000 BTC
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#aaa' }}>
          ≈ $0.00 USD
        </p>
      </div>

      <p style={{ color: '#999', fontSize: '14px', marginBottom: '20px' }}>
        🔍 No transactions found
      </p>
      
      {/* Disabled buttons to make it look like a real wallet */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          disabled 
          style={{ 
            padding: '12px 24px', 
            background: '#e0e0e0', 
            border: 'none', 
            borderRadius: '6px',
            color: '#999',
            cursor: 'not-allowed',
            fontSize: '14px'
          }}
        >
          📥 Receive
        </button>
        <button 
          disabled 
          style={{ 
            padding: '12px 24px', 
            background: '#e0e0e0', 
            border: 'none', 
            borderRadius: '6px',
            color: '#999',
            cursor: 'not-allowed',
            fontSize: '14px'
          }}
        >
          📤 Send
        </button>
      </div>

      {/* Subtle hint that this is a decoy (only visible to the user who knows) */}
      <p style={{ 
        marginTop: '30px', 
        fontSize: '11px', 
        color: '#ccc' 
      }}>
        Last synced: just now
      </p>
    </div>
  );
}