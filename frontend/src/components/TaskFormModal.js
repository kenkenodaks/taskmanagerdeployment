import React, { useState, useEffect } from 'react';

export default function TaskFormModal({ onClose, onSubmit, initial }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDescription(initial.description || '');
      setStatus(initial.status || 'todo');
      setDueDate(initial.dueDate ? initial.dueDate.split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDueDate('');
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    onSubmit({ title, description, status, dueDate: dueDate || null });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initial ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={submit}>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <label>Due date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
