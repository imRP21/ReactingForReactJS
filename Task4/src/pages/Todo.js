import React, { useState } from 'react';

// This is now a PAGE COMPONENT — same Todo logic, just lives in its own file.
// React Router will render this when the URL matches its route.

function Todo() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Learn React', completed: false },
    { id: 2, name: 'Build Todo App', completed: true },
  ]);

  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = {
      id: tasks.length + 1,
      name: inputValue.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      <h2>📝 To-Do</h2>

      <div className="input-section">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet! Add one above. 🎉</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className={task.completed ? 'completed-row' : ''}>
                <td>{task.id}</td>
                <td className={task.completed ? 'completed-text' : ''}>{task.name}</td>
                <td>
                  <span className="status-toggle" onClick={() => toggleComplete(task.id)} title="Click to toggle">
                    {task.completed ? '✅' : '❌'}
                  </span>
                </td>
                <td>
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tasks.length > 0 && (
        <p className="task-counter">
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed.
        </p>
      )}
    </div>
  );
}

export default Todo;