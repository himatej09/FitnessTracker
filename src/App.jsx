import React, { useState, useEffect } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Auth Form State
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');

  // Check if user is already logged in on mount
  useEffect(() => {
    const loggedUser = localStorage.getItem('logged_in_user');
    const userRole = localStorage.getItem('user_role');
    if (loggedUser) {
      setIsLoggedIn(true);
      setRole(userRole || 'user');
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isSignup) {
      localStorage.setItem('reg_email', email);
      localStorage.setItem('reg_password', password);
      localStorage.setItem('reg_role', selectedRole);
      alert('Registration successful! Please log in.');
      setIsSignup(false);
    } else {
      const savedEmail = localStorage.getItem('reg_email') || 'user@test.com';
      const savedPassword = localStorage.getItem('reg_password') || 'password123';
      const savedRole = localStorage.getItem('reg_role') || selectedRole;

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem('logged_in_user', email);
        localStorage.setItem('user_role', savedRole);
        setIsLoggedIn(true);
        setRole(savedRole);
      } else {
        alert('Invalid email or password! (Default test: user@test.com / password123)');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('logged_in_user');
    localStorage.removeItem('user_role');
    setIsLoggedIn(false);
  };

  // If NOT logged in, show Login / Signup Screen
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleAuth} style={{ backgroundColor: '#ffffff', padding: '36px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '360px' }}>
          <h2 style={{ marginBottom: '8px', color: '#1e293b' }}>{isSignup ? '📝 Create Account' : '🔐 Welcome Back'}</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Fitness Tracker Portal</p>
          
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', marginBottom: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '6px' }}>SELECT ROLE (Module)</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}
            >
              <option value="user">User Module</option>
              <option value="admin">Admin Module</option>
            </select>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <p onClick={() => setIsSignup(!isSignup)} style={{ textAlign: 'center', fontSize: '14px', color: '#6366f1', marginTop: '16px', cursor: 'pointer' }}>
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </p>
        </form>
      </div>
    );
  }

  // Main App View after Login
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* Navbar */}
      <nav style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <span>🏃</span> Fitness Tracker <span style={{ fontSize: '11px', backgroundColor: role === 'admin' ? '#ef4444' : '#6366f1', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{role}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
          {role === 'user' ? (
            ['dashboard', 'workout', 'diet', 'goals', 'profile'].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ color: activeTab === tab ? '#818cf8' : '#94a3b8', fontWeight: activeTab === tab ? '600' : '400', cursor: 'pointer', textTransform: 'capitalize' }}
              >
                {tab}
              </span>
            ))
          ) : (
            <span style={{ color: '#818cf8', fontWeight: '600' }}>Admin Control Panel</span>
          )}
          
          <button onClick={handleLogout} style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        
        {/* ================= ADMIN MODULE ================= */}
        {role === 'admin' && (
          <div>
            <header style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>⚙️ Admin Dashboard</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Manage platform users, workouts, and system configurations.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>Total Registered Users</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6366f1', margin: 0 }}>1,245</p>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>Active Workouts</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>342</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0 }}>User Management Table</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                    <th style={{ padding: '10px' }}>Email</th>
                    <th style={{ padding: '10px' }}>Role</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>user@test.com</td>
                    <td style={{ padding: '12px' }}>User</td>
                    <td style={{ padding: '12px', color: '#10b981' }}>Active</td>
                    <td style={{ padding: '12px' }}><button style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= USER MODULE ================= */}
        {role === 'user' && activeTab === 'dashboard' && (
          <div>
            <header style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>🏠 Dashboard</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Welcome back! Here is your daily fitness breakdown.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #6366f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>👟</span>
                  <span style={{ fontSize: '12px', backgroundColor: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>75%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>STEPS</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>7,520</div>
                <div style={{ width: '100%', backgroundColor: '#f1f5f9', height: '8px', borderRadius: '9999px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', backgroundColor: '#6366f1', height: '100%' }}></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #f97316' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🔥</span>
                  <span style={{ fontSize: '12px', backgroundColor: '#ffedd5', color: '#c2410c', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Active</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>CALORIES</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>520 kcal</div>
                <div style={{ width: '100%', backgroundColor: '#f1f5f9', height: '8px', borderRadius: '9999px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: '30%', backgroundColor: '#f97316', height: '100%' }}></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #0ea5e9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>💧</span>
                  <span style={{ fontSize: '12px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Hydrated</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>WATER</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>2.1 L</div>
                <div style={{ width: '100%', backgroundColor: '#f1f5f9', height: '8px', borderRadius: '9999px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', backgroundColor: '#0ea5e9', height: '100%' }}></div>
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: '4px solid #f43f5e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>❤️</span>
                  <span style={{ fontSize: '12px', backgroundColor: '#ffe4e6', color: '#be123c', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>Normal</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>HEART RATE</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>78 BPM</div>
                <div style={{ fontSize: '12px', color: '#f43f5e', marginTop: '24px' }}>● Live reading stable</div>
              </div>
            </div>
          </div>
        )}

        {role === 'user' && activeTab === 'workout' && (
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0 }}>🏋️ Workout Planner</h2>
            <p style={{ color: '#64748b' }}>Upper Body Strength, Cardio, and Leg Day routines available.</p>
          </div>
        )}

        {role === 'user' && activeTab === 'diet' && (
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0 }}>🥗 Diet & Nutrition</h2>
            <p style={{ color: '#64748b' }}>Protein: 110g/150g • Carbs: 210g/250g • Fats: 55g/70g</p>
          </div>
        )}

        {role === 'user' && activeTab === 'goals' && (
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0 }}>🎯 Fitness Goals</h2>
            <p style={{ color: '#64748b' }}>Track weekly mileage and water intake targets.</p>
          </div>
        )}

        {role === 'user' && activeTab === 'profile' && (
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginTop: 0 }}>👤 User Profile</h2>
            <p style={{ color: '#64748b' }}>Logged in as: {localStorage.getItem('logged_in_user')}</p>
          </div>
        )}

      </main>
    </div>
  );
}