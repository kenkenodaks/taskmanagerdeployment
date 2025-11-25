import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks', { params: filter ? { status: filter } : {} });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load tasks');
    }
  };

  useEffect(() => { fetchTasks(); }, [filter]);

  const createTask = async (payload) => {
    try {
      await api.post('/tasks', payload);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  };

  const updateTask = async (payload) => {
    try {
      await api.put(`/tasks/${editing._id}`, payload);
      setEditing(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="toolbar">
          <div>
            <label>Filter</label>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button onClick={() => { setEditing(null); setShowModal(true); }}>+ New Task</button>
        </div>

        <TaskList tasks={tasks} onEdit={(t) => { setEditing(t); setShowModal(true); }} onDelete={deleteTask} />
      </div>

      {showModal && (
        <TaskFormModal
          initial={editing}
          onClose={() => setShowModal(false)}
          onSubmit={editing ? updateTask : createTask}
        />
      )}
    </>
  );
}
