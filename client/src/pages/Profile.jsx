import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, updateUserFromProfile } = useAuth();
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container py-4 page-transition" style={{ maxWidth: 500 }}>
        <h2>My Profile</h2>
        <p>Please log in.</p>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // You need a backend route: PUT /api/users/profile
      const { data } = await api.put('/users/profile', form);
      updateUserFromProfile(data.user || data); // depends on how you return
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 page-transition" style={{ maxWidth: 500 }}>
      <h2>My Profile</h2>

      <form onSubmit={submit} className="mt-3">
        <div className="mb-2">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <button className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
