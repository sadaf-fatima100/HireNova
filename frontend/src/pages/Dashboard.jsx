import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors, getUser } from "../store/slices/userSlice";

import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

import {
  FaUser,
  FaEdit,
  FaLock,
  FaBriefcase,
  FaListAlt,
  FaFileAlt,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";

const navConfig = [
  { label: "My Profile", key: "My Profile", icon: <FaUser />, roles: ["Job Seeker", "Employer"] },
  { label: "Update Profile", key: "Update Profile", icon: <FaEdit />, roles: ["Job Seeker", "Employer"] },
  { label: "Update Password", key: "Update Password", icon: <FaLock />, roles: ["Job Seeker", "Employer"] },
  { label: "Post New Job", key: "Job Post", icon: <FaPlusCircle />, roles: ["Employer"] },
  { label: "My Jobs", key: "My Jobs", icon: <FaBriefcase />, roles: ["Employer"] },
  { label: "Applications", key: "Applications", icon: <FaListAlt />, roles: ["Employer"] },
  { label: "My Applications", key: "My Applications", icon: <FaFileAlt />, roles: ["Job Seeker"] },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Fetch user on mount ──
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // ── Handle errors and authentication ──
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    // ✅ Only navigate if loading is false
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, error, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  const handleNav = (key) => setComponentName(key);

  const sidebarClass = ["sidebar", collapsed ? "collapsed" : "", mobileOpen ? "showSidebar" : ""]
    .filter(Boolean)
    .join(" ");

  const renderComponent = () => {
    if (loading || !user) return <p>Loading user data...</p>;
    switch (componentName) {
      case "My Profile": return <MyProfile user={user} />;
      case "Update Profile": return <UpdateProfile user={user} />;
      case "Update Password": return <UpdatePassword />;
      case "Job Post": return <JobPost />;
      case "My Jobs": return <MyJobs />;
      case "Applications": return <Applications />;
      case "My Applications": return <MyApplications />;
      default: return <MyProfile user={user} />;
    }
  };

  return (
    <section className="account">
      {/* Header */}
      <div className="component_header">
        <p>Dashboard</p>
        <p>
          Welcome! <span>{user?.name || "..."}</span>
        </p>
      </div>

      <div className="container">
        {/* Sidebar */}
        <div className={sidebarClass}>
          <div className="sidebar-toggle">
            <button onClick={() => setCollapsed(!collapsed)} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
              {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
            </button>
          </div>

          <ul className="sidebar_links">
            <h4>Manage Account</h4>
            {navConfig.map((item) => {
              if (!user || !item.roles.includes(user.role)) return null;
              return (
                <li key={item.key}>
                  <button className={componentName === item.key ? "active-nav" : ""} onClick={() => handleNav(item.key)}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}

            <li>
              <button onClick={handleLogout}>
                <span className="nav-icon"><FaSignOutAlt /></span>
                <span className="nav-label">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="banner">
          <div className="sidebar_icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
          </div>

          {renderComponent()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
