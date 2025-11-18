import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get('/patients').then(res => setPatients(res.data)).catch(() => {});
  }, [user]);

  return (
    <div cclassName="container py-4 page-transition">
      <h1 className="mb-3">Welcome to MERNPro Dental Clinic</h1>
      <p className="text-muted"> Secure patient management built with MERN</p>

      {/* {!user && <p className="mt-3">Please sign in to view patients.</p>} */}

      {/* Add two clear buttons/links on Home for Sign In / Sign Up */}
      {!user && (
        <div className="mt-3">
          <p>Please sign in or create an account to manage patients.</p>
          <a href="/login" className="btn btn-primary me-2">Sign In</a>
          <a href="/signup" className="btn btn-outline-primary">Sign Up</a>
        </div>
      )}

      {user && (
        <>
          <h4 className="mt-4">Recent Patients</h4>
          <ul className="list-group">
            {patients.map(p => (
              <li key={p._id} className="list-group-item d-flex justify-content-between">
                <span><strong>{p.name}</strong> — {p.email} — {p.phone}</span>
              </li>
            ))}
            {patients.length === 0 && <li className="list-group-item">No patients yet.</li>}
          </ul>
        </>
      )}
    </div>
  );
}
