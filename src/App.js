import './App.css';
import { useState } from 'react';

function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [operation, setOperation] = useState('Add');
  const [result, setResult] = useState(null);
  
  const handleCalculate = () => {
    const numX = parseInt(x);
    const numY = parseInt(y);
    if (isNaN(numX) || isNaN(numY)) {
      setResult('Please enter valid numbers.');
      return;
    }
    if (operation === 'Add') {
      const res = numX + numY;
      setResult(res < 0 || res > 100 ? 'Result out of bounds [0...100]. Be mindful of the range.' : res);
    } else {
      const res = numX - numY;
      setResult(res < 0 || res > 100 ? 'Result out of bounds [0...100]. Be mindful of the range.' : res);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Simple Calculator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Enter value"
          value={x}
          onChange={e => setX(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Enter value"
          value={y}
          onChange={e => setY(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <select
          value={operation}
          onChange={e => setOperation(e.target.value)}
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        >
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
        </select>
        <button onClick={handleCalculate} style={{ padding: '0.5rem 1rem' }}>
          Calculate
        </button>
      </div>
      {result !== null && (
        <div className="app-subtitle" style={{ fontWeight: 'bold' }}>
          Result: {result}
        </div>
      )}
    </div>
  );
}

export default App;