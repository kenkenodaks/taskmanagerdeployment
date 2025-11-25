import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className="task-card">
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="meta">
              <small>Status: {task.status}</small>
              <small>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</small>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
