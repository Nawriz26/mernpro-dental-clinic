export default function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
      <tbody>
        {patients.map(p => (
          <tr key={p._id}>
            <td>{p.name}</td><td>{p.email}</td><td>{p.phone}</td>
            <td className="text-end">
              <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>onEdit(p)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>onDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
