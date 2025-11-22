import { useState, useEffect } from 'react';

export default function PatientForm({ onSubmit, initial }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    notes: '',
  });

  // Update form when editing a patient
  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        notes: '',
      });
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    // Reset form only after creating a new patient
    if (!initial) {
      setForm({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        notes: '',
      });
    }
  };

  const field = (key, type = 'text', label = null) => (
    <div className="mb-2">
      <label className="form-label">{label ?? key}</label>
      <input
        type={type}
        className="form-control"
        value={form[key] ?? ''}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <form onSubmit={submit}>
      {field('name', 'text', 'Name')}
      {field('email', 'email', 'Email')}
      {field('phone', 'text', 'Phone')}
      {field('dateOfBirth', 'date', 'Date of Birth')}
      {field('Address (To be Added)')}
       {field('Notes (To be Added)')}
    
      {/* {field('address', 'text', 'Address')} */}
      {/* {field('notes', 'text', 'Notes')} */}
      <button className="btn btn-primary mt-3 float-end">
        {initial ? 'Update' : 'Save'}
      </button>
    </form>
  );
}


