import { useState, useEffect } from "react";
import API from "../api/api";

export default function AttendanceList({ reload }) {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  // Fetch employees for dropdown
  useEffect(() => {
    API.get("/employees/")
      .then(res => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"));
  }, [reload]);

  const handleReset = () => {
    setEmployeeId("");
    setDate("");
    setRecords([]);
    setError("");
  };

  const fetchAttendance = async () => {
    if (!employeeId) {
      setError("Please select an employee");
      return;
    }

    try {
      setError("");

      // Call new API using employee_id (NOT DB id)
      const res = await API.get(`/attendance/by-emp/${employeeId}`);

      let data = res.data;

      // 🔍 Filter by date
      if (date) {
        data = data.filter(r => r.date === date);
      }

      setRecords(data);

    } catch (err) {
      setError(err.response?.data?.detail || "Error fetching attendance");
      setRecords([]);
    }
  };

  return (
    <div>
      <h3>Attendance Records</h3>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Employee Dropdown */}
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.employee_id}>
            {emp.employee_id} - {emp.full_name}
          </option>
        ))}
      </select>

      {/* Date Filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Buttons */}
      <button onClick={fetchAttendance}>Search</button>

      <button
        onClick={handleReset}
        style={{ marginLeft: "10px", background: "#ccc", color: "#000" }}
      >
        Reset
      </button>

      {/* Results */}
      {records.length === 0 ? (
        <p className="empty">No attendance data</p>
      ) : (
        <ul>
          {records.map(r => (
            <li key={r.id}>
              {r.date} - {r.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}