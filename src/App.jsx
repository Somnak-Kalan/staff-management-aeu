import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./Authentication/Login"; // Import your Login component here

// Import other pages
import DashboardPages from "./pages/DashboardPage/Index";
import StaffPage from "./pages/organization/Staff";
import DepartmentPage from "./pages/organization/Department/index";
import PositionPage from "./pages/organization/Position/index";
import SubjectPage from "./pages/organization/Subject/index";
import LeaveTypePage from "./pages/organization/LeaveType/index";
import HolidayPage from "./pages/organization/Holiday/index";
import EventPages from "./pages/organization/Event/index";
import SchedulePage from "./pages/staffSchedule/Schedule/index";
import ApplyShift from "./pages/staffSchedule/ApplySchedule/index";
import ApplyScheduleRule from "./pages/staffSchedule/ScheduleRule/index";
import AttendanceReport from "./pages/report/AttendanceReport/index";
import AttendanceList from "./pages/report/Attendance/index";
import RequestLeave from "./pages/report/RequestLeave/index";

// Import other styles
import "./App";
import "./styles/table.scss";

export default function App() {
  // const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [lastVisitedRoute, setLastVisitedRoute] = useState("/"); // Default to root route
  useEffect(() => {
    // Save the last visited route to localStorage
    localStorage.setItem("lastVisitedRoute", lastVisitedRoute);
  }, [lastVisitedRoute]);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedIn === "true");

    if (storedLoggedIn === "false" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    if (storedLoggedIn === null || storedLoggedIn === undefined) {
      window.location.href = "/login";
      return;
    }

    const storedLastVisitedRoute = localStorage.getItem("lastVisitedRoute");
    if (storedLastVisitedRoute) {
      setLastVisitedRoute(storedLastVisitedRoute);
    }
  }, []);

  const handleLogin = (is_login) => {
    if (is_login === true) {
      setIsLoggedIn(is_login);
      localStorage.setItem("isLoggedIn", is_login);
    } else {
      setIsLoggedIn(is_login);
      localStorage.setItem("isLoggedIn", is_login);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <>
          {isLoggedIn ? (
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPages />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/department" element={<DepartmentPage />} />
              <Route path="/position" element={<PositionPage />} />
              <Route path="/subject" element={<SubjectPage />} />
              <Route path="/leaveType" element={<LeaveTypePage />} />
              <Route path="/holiday" element={<HolidayPage />} />
              <Route path="/event" element={<EventPages />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/apply" element={<ApplyShift />} />
              <Route path="/schedule-rule" element={<ApplyScheduleRule />} />
              <Route path="/attendance-report" element={<AttendanceReport />} />
              <Route path="/attendance" element={<AttendanceList />} />
              <Route path="/request-leave" element={<RequestLeave />} />
            </Route>
          ) : (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
        </>
      </Routes>
    </BrowserRouter>
  );
}
