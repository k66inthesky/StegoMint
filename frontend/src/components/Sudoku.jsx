import React, { useState, useEffect } from 'react';
import { getSudoku } from 'sudoku-gen';

const Sudoku = ({ onUnlock }) => {
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]); // Store the puzzle, puzzle cells are not editable
  const [loading, setLoading] = useState(true);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    try {
      // 1. 生成新題目
      const sudoku = getSudoku('easy');
      const parsedGrid = parsePuzzle(sudoku.puzzle);
      
      // =========================================================
      // 🔓 Key Fix: Force clear the first 5 cells of the first row
      // =========================================================
      // Ensure these are always empty, so users can input '55555' or '44444'
      for (let i = 0; i < 5; i++) {
        parsedGrid[0][i] = ""; 
      }
      // =========================================================

      setGrid(parsedGrid);
      setInitialGrid(parsedGrid.map(row => [...row])); // 深拷貝一份作為初始對照
      setLoading(false);
    } catch (e) {
      console.error("Sudoku Gen Error:", e);
      setLoading(false);
    }
  };

  // Helper function: Convert 81 characters to 9x9 array
  const parsePuzzle = (puzzleString) => {
    const newGrid = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const char = puzzleString[i * 9 + j];
        // 如果不是數字 (是 - 或 .)，就給空字串
        row.push(/[1-9]/.test(char) ? char : "");
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  // Handle user input
  const handleInputChange = (rowIndex, colIndex, value) => {
    // 1. Basic validation: only allow 1-9 or empty
    if (value !== "" && !/^[1-9]$/.test(value)) return;

    // 2. Update board state
    const newGrid = grid.map((row, r) => 
      row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell))
    );
    setGrid(newGrid);

    // =========================================================
    // 🕵️‍♂️ Agent Logic (supports 55555 and 44444)
    // =========================================================
    // We only listen to the first row (Row 0)
    if (rowIndex === 0) {
      // Get the values of the first 5 cells (convert to string to avoid undefined)
      const c0 = String(newGrid[0][0]);
      const c1 = String(newGrid[0][1]);
      const c2 = String(newGrid[0][2]);
      const c3 = String(newGrid[0][3]);
      const c4 = String(newGrid[0][4]);

      // Concatenate into pattern
      const currentPattern = c0 + c1 + c2 + c3 + c4;

      // Check if it matches God Mode (55555) or Decoy (44444)
      if (currentPattern === '55555' || currentPattern === '44444') {
        console.log(`🕵️‍♂️ Password detected: ${currentPattern}, calling backend...`);

        fetch('http://localhost:8000/unlock', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pattern: currentPattern }), // Send detected pattern
        })
        .then(response => response.json())
        .then(data => {
          console.log("Agent Response:", data);
          
          // If backend confirms GOD_MODE or DURESS_MODE, notify App to switch
          if (data.mode === 'GOD_MODE' || data.mode === 'DURESS_MODE') {
            onUnlock(data.mode); 
          }
        })
        .catch((error) => {
          console.error('❌ Agent connection failed:', error);
          // Can alert during development, but keep quiet during Demo, pretend it's just a bug
          // alert("⚠️ Agent Offline"); 
        });
      }
    }
    // =========================================================
  };

  if (loading) return <div>Loading StegoMint...</div>;

  return (
    <div className="sudoku-container" style={{ textAlign: 'center' }}>
      <h1>🧩 Sudoku Game</h1>
      
      {/* Sudoku Board */}
      <div 
        className="sudoku-board" 
        style={{ 
          display: 'inline-grid', 
          gridTemplateColumns: 'repeat(9, 40px)', 
          gap: '1px', 
          background: '#000', 
          border: '2px solid #333',
          padding: '2px'
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            // Check if this is an initial puzzle cell (if so, disable editing)
            const isInitial = initialGrid[rowIndex][colIndex] !== "";
            
            // Calculate 3x3 block border styles
            const borderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8 ? '2px solid #000' : 'none';
            const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? '2px solid #000' : 'none';

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength="1"
                value={cell}
                disabled={isInitial}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '20px',
                  border: '1px solid #ddd',
                  borderRight: borderRight !== 'none' ? borderRight : '1px solid #ddd',
                  borderBottom: borderBottom !== 'none' ? borderBottom : '1px solid #ddd',
                  background: isInitial ? '#eee' : '#fff',
                  color: isInitial ? '#333' : 'blue',
                  fontWeight: isInitial ? 'bold' : 'normal',
                  outline: 'none',
                  cursor: isInitial ? 'default' : 'text'
                }}
              />
            );
          })
        ))}
      </div>

      {/* Control Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={startNewGame}
          style={{ padding: '10px 20px', fontSize: '16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
        >
          🔄 New Game
        </button>
        <button 
          onClick={() => {
            // Clear board (keep only puzzle cells)
            setGrid(initialGrid.map(row => [...row]));
          }}
          style={{ padding: '10px 20px', fontSize: '16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🗑️ Clear
        </button>
      </div>
      
      <p style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
        💡 Click a cell and enter a number 1-9 <br/>
        (Try entering 5,5,5,5,5 in the first row)
      </p>
    </div>
  );
};

export default Sudoku;