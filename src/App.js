import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {

    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");

  };

  const deleteTask = (index) => {
    const updated = tasks.filter((t, i) => i !== index);
    setTasks(updated);
  };

  const toggleComplete = (index) => {

    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const progress = total === 0 ? 0 : (completed / total) * 100;

  return (

    <div className="main-container">

      <div className="card">

        <h1>Task Manager</h1>

        <p className="subtitle">Stay organized and productive</p>

        <div className="input-section">

          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button onClick={addTask}>Add</button>

        </div>

        {/* Task Stats */}

        <div className="stats">

          <div>Total: {total}</div>
          <div>Completed: {completed}</div>
          <div>Pending: {pending}</div>

        </div>

        {/* Progress Bar */}

        <div className="progress-container">

          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

        <ul className="task-list">

  {tasks.map((t, index) => (

    <li key={index} className={t.completed ? "completed" : ""}>

      <span>
        {t.text}
      </span>

      <div className="task-buttons">

        <button
          className="complete-btn"
          onClick={() => toggleComplete(index)}
        >
          {t.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>

      </div>

    </li>

  ))}

</ul>

      </div>

    </div>

  );
}

export default App;