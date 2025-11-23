import { useEffect, useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    patientId: '',
    date: '',
    time: '',
    reason: '',
    status: 'Scheduled',
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search + Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Load appointments
  const loadAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data);
    } catch {
      toast.error('Failed to load appointments');
    }
  };

  // Load patients for dropdown
  const loadPatients = async () => {
    try {
      const { data } = await api.get('/patients');
      setPatients(data);
    } catch {
      toast.error('Failed to load patients for dropdown');
    }
  };

  useEffect(() => {
    loadAppointments();
    loadPatients();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientId) {
      toast.error('Please select a patient');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        patientId: form.patientId,
        date: form.date,
        time: form.time,
        reason: form.reason,
        status: form.status,
      };

      if (editingId) {
        await api.put(`/appointments/${editingId}`, payload);
        toast.success('Appointment updated');
      } else {
        await api.post('/appointments', payload);
        toast.success('Appointment created');
      }

      setForm({
        patientId: '',
        date: '',
        time: '',
        reason: '',
        status: 'Scheduled',
      });
      setEditingId(null);
      loadAppointments();
    } catch {
      toast.error('Error saving appointment');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (appt) => {
    setEditingId(appt._id);

    const patientId =
      (appt.patientId && appt.patientId._id) ||
      appt.patientId ||
      '';

    setForm({
      patientId,
      date: appt.date?.slice(0, 10) || '',
      time: appt.time || '',
      reason: appt.reason || '',
      status: appt.status || 'Scheduled',
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment deleted');
      loadAppointments();
    } catch {
      toast.error('Error deleting appointment');
    }
  };

  // Add filter appointments by search term + status
  const filteredAppointments = appointments.filter((a) => {
    const name =
      a.patientName || a.patientId?.name || '';

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-4 page-transition">
      <h2>Appointments</h2>

      <div className="row mt-3">
        <div className="col-md-5">
          <div className="card card-body">
            <h5>{editingId ? 'Edit Appointment' : 'New Appointment'}</h5>
            <form onSubmit={onSubmit}>
              {/* Patient dropdown */}
              <div className="mb-2">
                <label className="form-label">Patient</label>
                <select
                  className="form-select"
                  name="patientId"
                  value={form.patientId}
                  onChange={onChange}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} {p.email ? `(${p.email})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={form.time}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Reason</label>
                <input
                  className="form-control"
                  name="reason"
                  value={form.reason}
                  onChange={onChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={onChange}
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <button className="btn btn-primary mt-2" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-7">
          <div className="table-responsive card card-body">
            <h5>Upcoming Appointments</h5>

            {/* Search + Filter Controls */}
            <div className="d-flex gap-2 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <table className="table table-striped mt-2 rounded">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((a) => (
                  <tr key={a._id}>
                    <td>
                      {a.patientName ||
                        a.patientId?.name ||
                        '(Unknown)'}
                    </td>
                    <td>{a.date?.slice(0, 10)}</td>
                    <td>{a.time}</td>
                    <td>{a.status}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2 w-100"
                        onClick={() => onEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger w-100"
                        onClick={() => onDelete(a._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}


