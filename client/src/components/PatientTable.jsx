export default function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <div className="table-responsive mb-4">
    
    <table className="table table-striped rounded border table-bordered">
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
      <tbody>
        {patients.map(p => (
          <tr key={p._id}>
            <td>{p.name}</td><td>{p.email}</td><td>{p.phone}</td>
            <td className="text-center" style ={{contentAlign: 'center'}}>
              <button className="btn btn-sm btn-outline-secondary p-1 w-100" onClick={()=>onEdit(p)}>Edit</button>
              <button className="btn btn-sm btn-outline-danger p-1 w-100" onClick={()=>onDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
