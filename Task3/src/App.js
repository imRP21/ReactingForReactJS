import './App.css';
import React, { useState } from 'react';

function App() {
  const tasks = [
    { id: 1, name: 'Learn React', completed: false },
    { id: 2, name: 'Build Todo App', completed: true },
  ];

  return (
    <div className="app-container">
      <h1 className="app-title">To-Do App</h1>
      <div style={{ marginBottom: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.completed ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;