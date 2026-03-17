import { useState } from "react";
import API from "../api/api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!form.employee_id.trim()) {
      newErrors.employee_id = "Employee ID is required";
    }

    if (!form.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.department.trim()) {
      newErrors.department = "Department is required";
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
      await API.post("/employees/", form);

      // Reset form
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });

      setErrors({});
      refresh();
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
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
          {/* API Error */}
          {errors.api && <p className="error">{errors.api}</p>}

          <div className="form-row">
            <div>
              <input
                placeholder="Employee ID"
                value={form.employee_id}
                onChange={(e) =>
                  setForm({ ...form, employee_id: e.target.value })
                }
              />
              {errors.employee_id && <p className="error">{errors.employee_id}</p>}
            </div>

            <div>
              <input
                placeholder="Full Name"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />
              {errors.full_name && <p className="error">{errors.full_name}</p>}
            </div>

            <div>
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
              <input
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
              {errors.department && <p className="error">{errors.department}</p>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
      </form>
    </div>
  );
}