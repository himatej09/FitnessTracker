import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_password', password);
      alert('Signup successful! Please log in.');
      setIsSignup(false);
    } else {
      const savedEmail = localStorage.getItem('user_email');
      const savedPassword = localStorage.getItem('user_password');
      if (email === savedEmail && password === savedPassword) {
        onLogin();
      } else {
        alert('Invalid email or password!');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '320px' }}>
        <h2 style={{ marginBottom: '20px' }}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          {isSignup ? 'Register' : 'Login'}
        </button>
        <p onClick={() => setIsSignup(!isSignup)} style={{ textAlign: 'center', fontSize: '14px', color: '#6366f1', marginTop: '16px', cursor: 'pointer' }}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
}