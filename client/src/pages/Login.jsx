import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [emailOrUsername, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Call API immediately
      await login(emailOrUsername, password);

      // Keep spinner for 4 seconds
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        toast.success('Login successful!');

        // Briefly show success check, then navigate
        setTimeout(() => {
          nav('/dashboard');
        }, 800);
      }, 1000);
    } catch {
      // Also delay error so spinner is consistent
      setTimeout(() => {
        setLoading(false);
        setError('Invalid credentials');
        toast.error('Login failed – please check your credentials.');
      }, 1000);
    }
  };

  return (
    
    <div className="container page-transition" style={{ maxWidth: 450, alignContent: 'center', height: '100vh'}}>
      

      <form className="container text-center page-transition p-4 border border-secondary rounded"  onSubmit={submit}>
        <h2 className="mb-3">Sign In</h2>
        <div className="mb-2">
        
          <input
            placeholder='Email or Username'
            className="form-control p-3"
            value={emailOrUsername}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder='Password'
            className="form-control p-3"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger mt-2">{error}</div>}

        <button className="btn btn-primary mt-3" disabled={loading}>
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

          {loading && !success && 'Signing in...'}
          {!loading && success && 'Success!'}
          {!loading && !success && 'Login'}
        </button>


        <p className ="text-center mt-3 pt-2"> Not Registered? <a href="/signup">Sign Up</a></p>
      </form>

      
    </div>
  );
}
