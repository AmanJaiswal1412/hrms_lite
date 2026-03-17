import { useEffect, useState } from "react";
import API from "../api/api";

export default function EmployeeList({ reload, refresh }) {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
    refresh(); // update count
  };

  useEffect(() => {
    fetchEmployees();
  }, [reload]);

  return (
    <div>
      <h3>Employees</h3>

      {employees.length === 0 ? (
        <p className="empty">No employees found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}