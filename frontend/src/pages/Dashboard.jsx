import { useEffect, useState } from "react";
import API from "../api/api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
      setReload(prev => !prev);
  };

  const fetchCount = async () => {
    const res = await API.get("/employees/");
    setCount(res.data.length);
  };

  useEffect(() => {
    fetchCount();
  }, [reload]);

  return (
    <div className="container">
      <h1>HRMS Dashboard</h1>

      {/* Dashboard Card */}
      <div className="card">
        <h3>Total Employees</h3>
        <h2>{count}</h2>
      </div>

      <div className="card">
        <EmployeeForm refresh={triggerReload} />
      </div>

      <div className="card">
        <EmployeeList
          reload={reload}
          refresh={triggerReload}
        />
      </div>

      <div className="card">
        <AttendanceForm reload={reload} />
      </div>

      <div className="card">
        <AttendanceList reload={reload} />
      </div>
    </div>
  );
}