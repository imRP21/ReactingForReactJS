import './App.css';
import React, { useState } from 'react';

function App() {

  // [STATE MANAGEMENT]
  // useState returns [currentValue, setterFunction]

  // State 1: The list of tasks (array of objects).
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Learn React', completed: false },
    { id: 2, name: 'Build Todo App', completed: true },
  ]);

  // State 2: What the user is typing in the input box.
  // This is a "controlled component" pattern — React controls the input's value.
  const [inputValue, setInputValue] = useState('');

  // [EVENT HANDLERS]
  // These are the functions that run when user interacts with the UI.

  // ADD: Create a new task from the input value.
  const addTask = () => {
    if (inputValue.trim() === '') return;

    // Create new task object
    const newTask = {
      id: tasks.length + 1,      // Use length of tasks array as unique ID (simple trick).
      name: inputValue.trim(),   // The task name from input.
      completed: false           // New tasks start as not completed.
    };

    // Update state: spread existing tasks + add new one at the end.
    // IMPORTANT: Never mutate state directly (tasks.push => BAD practice).
    // Always create a new array: [...oldArray, newItem]
    // [Question] What's ... spread operator? It takes all elements from the existing tasks array and includes them in the new array, followed by the newTask. This way we create a new array instead of modifying the existing one, which is important for React to detect changes and re-render properly.
    setTasks([...tasks, newTask]);

    // Clear the input box after adding.
    setInputValue('');
  };

  // DELETE: Remove a task by its ID.
  const deleteTask = (taskId) => {
    // .filter() returns a NEW array with only items matching the predicate.
    // Keep every task except the one with the matching ID.
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // TOGGLE COMPLETE: Flip the completed status of a task.
  const toggleComplete = (taskId) => {
    // .map() returns a NEW array, transforming the matching task.
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // Spread the task object and override 'completed' with its opposite.
        // [Question] What operation we can do after spreading the object? Previously we had ...tasks to spread an array. Here we have ...task to spread an object. After spreading, we can override or add properties. In this case, we override 'completed' with its opposite value (!task.completed) to toggle the status.
        // [Question] Why do we need to spread the task object here? We need to create a new object for the updated task to maintain immutability. If we directly modified the existing task object, it would mutate the state, which can lead to bugs and issues with React's rendering. By spreading the task into a new object and then changing the 'completed' property, we ensure that we're creating a new object reference, which allows React to detect the change and re-render appropriately.
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  // Handle Enter key press in input field.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // [RENDER (JSX)].
  return (
    <div className="app-container">
      <h1 className="app-title">📝 To-Do App</h1>

      {/* INPUT SECTION */}
      <div className="input-section">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={inputValue}               // Controlled by React state
          // [Question] Each key stroke triggers a state update and re-render. Is this efficient? Yes, for small apps. For larger apps, consider debouncing or other optimizations.
          onChange={e => setInputValue(e.target.value)}  // Update state on every keystroke
          // [Question] What does onKeyDown do? It listens for key presses. If user hits Enter, it calls addTask() to add the task without needing to click the button.
          // [Question] Why paranthesis for handleKeyPress call are ommitted? Because we're passing the function reference, not calling it immediately. If we wrote onKeyDown={handleKeyPress()}, it would call the function right away during rendering, not on key press - which is not what we want. We want it to be called only when a key is pressed, so we just pass the function name without parentheses.
          // [Question] Can't we use () => handleKeyPress() instead? Yes, we could write onKeyDown={(e) => handleKeyPress(e)}. Just passing the function reference (React calls it with (event) arg) is cleaner and more efficient in this case.
          // Rule of thumb: If your handler needs the event object, either pass the reference directly or forward e explicitly.
          onKeyDown={handleKeyPress}        // Add task on Enter
        />
        <button className="add-button" onClick={addTask /* [Question] Compare this onClick with that of Task1? => Similar to Task1 we could've used this construct as well () => addTask(). */}>
          Add Task
        </button>
      </div>

      {/* CONDITIONAL RENDERING */}
      {/* Show table only if there are tasks, otherwise show a message. */}
      {tasks.length === 0 ? (
        // [Question] In Task1, we had a div inside the conditional. Here we're returning a <p> element with a message? div vs p? Both are fine for this purpose. A <p> is semantically appropriate for a message, while a <div> is more generic. The key point is that we can return any JSX element based on the condition.
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
                {/* Conditional class: strike-through text if completed */}
                <td className={task.completed ? 'completed-text' : ''}>
                  {task.name}
                </td>
                <td>
                  {/* Click the status emoji to toggle complete */}
                  <span // [Question] What's the purpose of this span? It's a clickable element that shows whether the task is completed (✅) or not (❌). When clicked, it toggles the completed status of the task.
                    className="status-toggle"
                    onClick={() => toggleComplete(task.id)} // [Question] Can't we use onClick={toggleComplete(task.id)} instead? No, because that would mean call the function right now. So during rendering, it causes infinite loop of re-renders(?). We need to wrap it in an arrow function to create a new function that calls toggleComplete with the task ID when the click happens.
                    title="Click to toggle"
                  >
                    {task.completed ? '✅' : '❌'}
                  </span>
                </td>
                <td>
                  {/* Delete button — passes task.id to deleteTask */}
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)} // [Question] Can't we use onClick={deleteTask(task.id)} instead? No, because that would mean call the function right now. So during rendering, it causes infinite loop of re-renders. We need to wrap it in an arrow function to create a new function that calls deleteTask with the task ID when the click happens.
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* TASK COUNTER */}
      {tasks.length > 0 && (
        <p className="task-counter">
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed.
        </p>
      )}
    </div>
  );
}

export default App;