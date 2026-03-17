import { useState, useEffect } from "react";
import API from "../api/api";

export default function AttendanceForm({ reload }) {
  const [employees, setEmployees] = useState([]);

  const initialForm = {
    employee_id: "",
    date: "",
    status: "Present",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/employees/").then(res => setEmployees(res.data));
  }, [reload]);

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!form.employee_id) {
      newErrors.employee_id = "Please select an employee";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    }

    if (!form.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await API.post("/attendance/", form);

      alert("Attendance marked");

      // Reset form
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setErrors({
        api: err.response?.data?.detail || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Mark Attendance</h3>

      {/* API Error */}
      {errors.api && <p className="error">{errors.api}</p>}

      <form onSubmit={handleSubmit} className="form-row">

        {/* Employee */}
        <div>
          <select
            value={form.employee_id}
            onChange={(e) =>
              setForm({ ...form, employee_id: e.target.value })
            }
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>
          {errors.employee_id && (
            <p className="error">{errors.employee_id}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
          {errors.date && (
            <p className="error">{errors.date}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          {errors.status && (
            <p className="error">{errors.status}</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Mark"}
        </button>
      </form>
    </div>
  );
}