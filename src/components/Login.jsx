import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log('Login submitted:', formData);
    // Add your login logic here
    // Example: setErrorMessage('Invalid credentials');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="login-section">
          <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to your account to continue.</p>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={handleBack}
              className="button"
            >
              Back
            </button>

            <button
              type="submit"
              className="button"
            >
              Sign In
            </button>
          </div>

          <div className="signup-link">
            Don't have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}