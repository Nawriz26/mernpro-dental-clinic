import { useState, useEffect } from 'react';

export default function PatientForm({ onSubmit, initial }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dateOfBirth: '', address: '', notes: ''
  });
  useEffect(()=>{ if(initial) setForm(initial); }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const field = (key, type='text', label=null) => (
    <div className="mb-2">
      <label className="form-label">{label ?? key}</label>
      <input type={type} className="form-control"
        value={form[key] ?? ''} onChange={e=>setForm({...form,[key]:e.target.value})}/>
    </div>
  );

  return (
    <form onSubmit={submit}>
      {field('name','text','Name')}
      {field('email','email','Email')}
      {field('phone','text','Phone')}
      {field('dateOfBirth','date','Date of Birth')}
      {field('address')}
      {field('notes')}
      <button className="btn btn-primary mt-2">Save</button>
    </form>
  );
}
