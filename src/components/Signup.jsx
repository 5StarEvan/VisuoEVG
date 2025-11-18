import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="signup-text">
          <div className="signup-header">
          <h2>Create an Account</h2>
          <p>Please fill in your information to get started.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
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
          
          <div className="button-group">
            <button
              type="button"
              onClick={handleBack}
              className="signup-button back-button"
            >
              Back
            </button>
            <button
              type="submit"
              className="signup-button"
            >
              Create Account
            </button>
          </div>
          
          <div className="login-link">
            Already have an account?{' '}
            <Link to="/login">Log in</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}