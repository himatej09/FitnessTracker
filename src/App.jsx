import { useState } from 'react';
import Register from './Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Diet from './pages/Diet.jsx';
import Goals from './pages/Goals.jsx';
import Profile from './pages/Profile.jsx';
import Progress from './pages/Progress.jsx';
import Workout from './pages/Workout.jsx';
import './App.css';
import './pages/Register.css';

const ACCOUNTS_KEY = 'fitness_tracker_accounts';

function getStoredAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (!savedAccounts) return [];

  const accounts = JSON.parse(savedAccounts);
  if (!Array.isArray(accounts) || accounts.some((account) => !account || typeof account.email !== 'string')) {
    throw new Error('Saved account data has an unexpected format.');
  }
  return accounts;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('logged_in_user')));
  const [role, setRole] = useState(() => localStorage.getItem('user_role') || 'user');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState(() => localStorage.getItem('logged_in_user') || '');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [displayName, setDisplayName] = useState(() => localStorage.getItem('logged_in_name') || '');
  const [authMessage, setAuthMessage] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthMessage('');
    setAuthError(false);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = getStoredAccounts();
      const savedAccount = accounts.find(
        (account) => account.email.toLowerCase() === normalizedEmail && account.password === password,
      );
      const legacyEmail = (localStorage.getItem('reg_email') || '').trim().toLowerCase();
      const isLegacyAccount = normalizedEmail === legacyEmail && password === localStorage.getItem('reg_password');
      const isDemoAccount = normalizedEmail === 'user@test.com' && password === 'password123';
      const account = savedAccount || (isLegacyAccount ? {
        email: normalizedEmail,
        fullName: normalizedEmail.split('@')[0],
        role: localStorage.getItem('reg_role') || 'user',
      } : isDemoAccount ? { email: normalizedEmail, fullName: 'Fitness User', role: 'user' } : null);

      if (!account) {
        setAuthError(true);
        setAuthMessage('Email or password is incorrect. Check your details and try again.');
        return;
      }

      const accountRole = account.role || 'user';
      if (accountRole !== selectedRole) {
        setAuthError(true);
        setAuthMessage(`This account belongs to the ${accountRole} module. Select it to continue.`);
        return;
      }

      const name = account.fullName || normalizedEmail.split('@')[0];
      localStorage.setItem('logged_in_user', normalizedEmail);
      localStorage.setItem('user_role', accountRole);
      localStorage.setItem('logged_in_name', name);
      localStorage.setItem('last_login_at', new Date().toISOString());
      setEmail(normalizedEmail);
      setDisplayName(name);
      setRole(accountRole);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Unable to read or save account data.', error);
      setAuthError(true);
      setAuthMessage('We could not access saved account data. Check browser storage and try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('logged_in_user');
    localStorage.removeItem('user_role');
    localStorage.removeItem('logged_in_name');
    setIsLoggedIn(false);
    setPassword('');
  };

  if (!isLoggedIn) {
    if (isSignup) {
      return (
        <Register
          onRegistered={(account) => {
            setEmail(account.email);
            setPassword('');
            setIsSignup(false);
            setAuthError(false);
            setAuthMessage('Account saved. Sign in with your new details.');
          }}
          onSwitchToLogin={() => {
            setIsSignup(false);
            setAuthMessage('');
            setAuthError(false);
          }}
        />
      );
    }

    return (
      <div className="login-wrapper">
        <section className="login-card">
          <div className="login-brand"><span>🏃</span><strong>FITNESS TRACKER</strong></div>
          <h1>Sign in</h1>
          <form className="login-form" onSubmit={handleAuth}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="login-role">Open module</label>
            <select id="login-role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="user">User module</option>
              <option value="admin">Admin module</option>
            </select>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {authMessage && <p className={`login-feedback ${authError ? 'login-feedback-error' : ''}`} role="status">{authMessage}</p>}
            <button type="submit" className="login-submit">Sign in <span aria-hidden="true">→</span></button>
          </form>
          <p className="login-redirect">New here? <button type="button" onClick={() => { setIsSignup(true); setAuthMessage(''); }}>Create an account</button></p>
          <p className="storage-note">Demo only: passwords and roles are stored in this browser and are not secure.</p>
        </section>
      </div>
    );
  }

  // Main App View after Login
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* Navbar */}
      <nav className="app-nav" aria-label="Main navigation">
        <button className="app-brand" onClick={() => setActiveTab('dashboard')}>
          <span aria-hidden="true">🏃</span> Fitness Tracker <span className={`role-badge role-${role}`}>{role}</span>
        </button>

        <div className="app-nav-links">
          {role === 'user' ? (
            ['dashboard', 'workout', 'diet', 'goals', 'progress', 'profile'].map((tab) => (
              <button
                className={`app-nav-link ${activeTab === tab ? 'app-nav-link-active' : ''}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab}
              </button>
            ))
          ) : (
            <span style={{ color: '#818cf8', fontWeight: '600' }}>Admin Control Panel</span>
          )}
          
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="app-main">
        
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

        {role === 'user' && (
          <div className="app-page">
            {activeTab === 'dashboard' && <Dashboard displayName={displayName} />}
            {activeTab === 'workout' && <Workout />}
            {activeTab === 'diet' && <Diet />}
            {activeTab === 'goals' && <Goals />}
            {activeTab === 'progress' && <Progress />}
            {activeTab === 'profile' && <Profile email={email} displayName={displayName} />}
          </div>
        )}

      </main>
    </div>
  );
}