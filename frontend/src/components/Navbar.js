import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="container">
        <h1>Task Manager</h1>
        <div>
          {user && (
            <>
              <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
