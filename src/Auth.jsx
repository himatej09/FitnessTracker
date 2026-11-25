import { useState } from 'react';
import './pages/Register.css';

const ACCOUNTS_KEY = 'fitness_tracker_accounts';
const fitnessGoals = ['Lose Weight', 'Build Muscle', 'Endurance', 'Stay Active'];

function getAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (!savedAccounts) return [];

  const accounts = JSON.parse(savedAccounts);
  if (!Array.isArray(accounts) || accounts.some((account) => !account || typeof account.email !== 'string')) {
    throw new Error('Saved account data has an unexpected format.');
  }
  return accounts;
}

export default function Register({ onRegistered, onSwitchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [goal, setGoal] = useState('Build Muscle');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      const accounts = getAccounts();
      if (accounts.some((account) => account.email.toLowerCase() === normalizedEmail)) {
        setMessage('An account with this email already exists.');
        return;
      }

      const account = {
        fullName: fullName.trim(),
        email: normalizedEmail,
        password,
        role,
        ...(role === 'user' && { goal }),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
      setMessage('');
      setPassword('');
      onRegistered(account);
    } catch (error) {
      console.error('Unable to save registration data.', error);
      setMessage('Could not save your account. Check browser storage and try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <section className="register-container">
        <div className="register-form-section">
          <div className="register-brand"><span>🏃</span><strong>FITNESS TRACKER</strong></div>
          <div className="form-header"><h1>Create account</h1></div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <span className="form-label">Account type</span>
              <div className="role-switcher">
                <button type="button" className={`role-btn ${role === 'user' ? 'active' : ''}`} onClick={() => setRole('user')}>
                  🏃 User
                </button>
                <button type="button" className={`role-btn ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
                  🛡️ Admin
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                className="form-input"
                type="text"
                autoComplete="name"
                maxLength="60"
                placeholder="Your name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                className="form-input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  minLength="8"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {role === 'user' && (
              <div className="form-group">
                <span className="form-label">Fitness goal</span>
                <div className="goal-pills">
                  {fitnessGoals.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`goal-pill ${goal === item ? 'selected' : ''}`}
                      onClick={() => setGoal(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {message && <p className="register-feedback register-feedback-error" role="status">{message}</p>}
            <button type="submit" className="submit-btn">Create account</button>
          </form>

          <p className="login-redirect">
            Already registered? <button type="button" onClick={onSwitchToLogin}>Login</button>
          </p>
          <p className="storage-note">Demo only: passwords are stored in this browser as plain text.</p>
        </div>
      </section>
    </div>
  );
}
