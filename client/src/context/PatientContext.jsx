import { createContext, useContext, useState } from 'react';

const PatientContext = createContext(null);
export const usePatients = () => useContext(PatientContext);

export default function PatientProvider({ children }) {
  const [patientCount, setPatientCount] = useState(0);

  return (
    <PatientContext.Provider value={{ patientCount, setPatientCount }}>
      {children}
    </PatientContext.Provider>
  );
}
