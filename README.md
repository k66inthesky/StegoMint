# StegoMint

<p align="center">
  <img src="frontend/src/assets/logo.png" alt="StegoMint Logo" width="200"/>
</p>

Play on : https://stegomint.shakespeare.wtf 
Youtube: https://www.youtube.com/watch?v=kpVK8eapx70

<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/368461f4-680a-4661-9ea0-7001bced9b9c" />


https://github.com/user-attachments/assets/3beecf76-29d9-4d66-830e-448f6fa4003b


## 📌 Project Info

| Item | Details |
|------|---------|
| **Author** | [k66](https://github.com/k66inthesky) |
| **Hackathon** | [btc++ Taipei Hackathon](https://www.btcplusplus.dev/) |
| **Date** | Dec. 15-17, 2025 |
| **Submission** | [Freedom Devpost](https://freedom.devpost.com/) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite (hosted on Shakespeare to comply with Shakespeare track requirements) |
| **Backend** | Actually in Shakespeare no need backend, use `BTCtransfer.jsx` to transfer with unisat SDK, but here I offer backend: Python (using `bdkpython` to comply with Bitcoin Dev Kit track) |
| **Wallet Support** | UniSat Wallet for Bitcoin transactions |

---

## ✅ Successful Transaction Proof

| Item | Value |
|------|-------|
| **Payload (TXID)** | `fd91912ebb9a546d543b83b2287c37cd790fb0a1471f94ba6a07c547fd9afcef` |
| **Mempool Link** | [View on Mempool (Testnet)](https://mempool.space/testnet/tx/fd91912ebb9a546d543b83b2287c37cd790fb0a1471f94ba6a07c547fd9afcef) |

---

# Overview(Backend)
1. **Disguised Entry**: When the app launches, it appears as a normal Sudoku game, serving as a "digital safe" to hide its true functionality.
2. **Dual Identity Detection**: The system automatically switches between "Duress Mode" and "God Mode" based on the unlock method used (normal unlock vs. secret unlock).
3. **Decoy Wallet**: If unlocked normally (Duress Mode), only a harmless or empty fake wallet interface (Wallet) is displayed to deceive attackers.
4. **Real Wallet Transfer**: Only by triggering the secret mechanism (God Mode/Bob) will the hidden Bitcoin transfer interface (BtcTransfer) open and connect to the UniSat wallet.
5. **Blockchain Interaction**: In the real interface, Bob can enter Alice's address and successfully send real transactions via the Bitcoin Testnet.

# File Directory
```
stegomint-project/
├── node_modules/          # Dependencies (ignore this)
├── public/                # Static assets (e.g., favicon)
├── src/                   # [CORE] All source code is here
│   ├── assets/            # Images or static files
│   ├── components/        # [CORE] Custom functional components
│   │   ├── BtcTransfer.jsx  # Real Wallet: Bob's transfer function (God Mode)
│   │   ├── Sudoku.jsx       # Disguised Entry: Sudoku game with unlock logic
│   │   └── Wallet.jsx       # Fake Wallet: Harmless interface for Alice (Duress Mode)
│   ├── App.css            # Stylesheet
│   ├── App.jsx            # <--- [CORE] Main App: Handles identity detection and screen switching
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point (mounts App to HTML)
├── .gitignore             # Git configuration
├── index.html             # HTML entry page
├── package.json           # Project config (dependency list)
└── vite.config.js         # Vite bundler configuration
```
