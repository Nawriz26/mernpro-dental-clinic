import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const { signup } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await signup(form);

      // Spinner for 4 seconds
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        toast.success('Account created successfully!');

        // Show success briefly, then go to dashboard
        setTimeout(() => {
          nav('/dashboard');
        }, 800);
      }, 1000);
    } catch {
      setTimeout(() => {
        setLoading(false);
        setError('Signup failed (user may already exist).');
        toast.error('Signup failed – please try again.');
      }, 1000);
    }
  };

  return (
    <div className="container py-4 page-transition" style={{ maxWidth: 450 , alignContent: 'center', height: '100vh' }}>
      

      <form className="container text-center page-transition p-4 border border-secondary rounded" onSubmit={submit}>
        <h2 className="mb-3">Create Account</h2>
        
        <div className="mb-2">
          <input
          placeholder='Username'
            className="form-control p-3"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="email"
            placeholder='Email'
            className="form-control p-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-2">
         
          <input
          type="password"
            placeholder='Password'
            className="form-control p-3"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && <div className="alert alert-danger mt-2">{error}</div>}

        <button className="btn btn-success mt-3" disabled={loading}>
          {/* Spinner while loading */}
          {loading && !success && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}

          {/* Green check icon on success */}
          {success && !loading && (
            <i className="bi bi-check-circle-fill text-success me-2"></i>
          )}

          {loading && !success && 'Signing up...'}
          {!loading && success && 'Success!'}
          {!loading && !success && 'Sign Up'}
        </button>


        <p className ="text-center mt-3 pt-2"> Already Registered? <a href="/login">Log In</a></p>
      </form>
    </div>
  );
}
