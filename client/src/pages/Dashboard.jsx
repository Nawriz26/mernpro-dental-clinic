import { useEffect, useState } from 'react';
import api from '../api/axios';
import PatientForm from '../components/PatientForm';
import PatientTable from '../components/PatientTable';
import { usePatients } from '../context/PatientContext';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/ConfirmModal';
export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const { setPatientCount } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const load = async () => {
    const { data } = await api.get('/patients');
    setPatients(data);
    setEditing(null);
    setPatientCount(data.length);
    setPage(1);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const authenticatePhone = async (phone) => {
    const { data } = await api.post('/auth/send-code', { phone });
    return data;
  }

  const create = async (payload) => {
    await api.post('/patients', payload);
    toast.success('Patient created');
    await load();
  };

  const update = async (payload) => {
    await api.put(`/patients/${editing._id}`, payload);
    toast.success('Patient updated');
    await load();
  };

  const remove = async (id) => {
    // if (!window.confirm('Delete this patient?')) return;
    await api.delete(`/patients/${id}`);
    toast.success('Patient deleted');
    await load();
  };

  const filtered = patients.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return (
    <div className="container gap-1 py-4 page-transition">
      <h2 className='center-text w-100 p-2'>Patient Dashboard</h2>

      <div className="row mt-3">
        <div className="col-md-5">
          <div className="container card card-body ">
            <h5 className = "alignContent">{editing ? 'Edit Patient' : 'Add New Patient'}</h5>
            <PatientForm initial={editing} onSubmit={editing ? update : create} />
          </div>
        </div>

        <div className="col-md-7">
          <div className="container card card-body">

            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Patients</h5>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ maxWidth: 220 }}
                placeholder="Search by name, email, phone"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <PatientTable
              patients={current}
              onEdit={setEditing}
              onDelete={setSelectedPatient}
            />

            <ConfirmModal
            show={!!selectedPatient}
            message= "Are you sure that you wish to delete the patient?"
            onConfirm={async () => {
              if (!selectedPatient) return;
              // ConfirmModal already logs once to console
              await remove(selectedPatient || selectedPatient);
              setSelectedPatient(null);
            }}
            onCancel={() => setSelectedPatient(null)}
            confirmText="Delete"
            cancelText="Cancel"
            />

            {/* Pagination */}
            <nav aria-label="Patient pages">
              <ul className="pagination pagination-sm mb-0 justify-content-end">
                <li className={`page-item ${safePage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goTo(safePage - 1)}>
                    Prev
                  </button>
                </li>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${safePage === idx + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => goTo(idx + 1)}>
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${safePage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => goTo(safePage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </div>
  );
}
