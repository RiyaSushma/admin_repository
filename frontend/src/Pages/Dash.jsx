import React, { useState, useEffect } from "react";
import NavBar from "../Assets/Navbar";
import axios from "axios"; // Import Axios for API requests
import "../styles/dash.css";
import { LineChart, PieChart } from "@mui/x-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

function Dash() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchedTerm, setSearchedterm] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [users, setUsers] = useState([]); // State to hold user data
  const [courses, setCourses] = useState([]); // State to hold course data
  const [summary, setSummary] = useState({
    activeUsers: 0,
    pendingApprovals: 0,
    pendingPayments: 0,
    courses: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const filteredData = users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchedTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchedTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchedTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length/usersPerPage);
  const startIndex = (currentPage - 1)*usersPerPage;
  const paginatedUsers = filteredData.slice(startIndex, startIndex+usersPerPage);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch data from backend when the component mounts
  useEffect(() => {
    // Fetch users data
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users`)
      .then((response) => {
        setUsers(response.data);
        setSummary((prevSummary) => ({
          ...prevSummary,
          activeUsers: response.data.length, // Example: Count active users
        }));
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch courses data
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/courses`)
      .then((response) => {
        setCourses(response.data);
        setSummary((prevSummary) => ({
          ...prevSummary,
          courses: response.data.length, // Example: Count courses
        }));
      })
      .catch((error) => console.error("Error fetching courses:", error));

    // Fetch additional data like pending approvals or payments if applicable
    // Example: setSummary with pending approvals and payments here
  }, []); // Empty array ensures this effect runs once when the component mounts


  const handleSort = (key) => {
    let direction = 'asc';
    if(sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUser = [...filteredData].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if(a[key] > b[key]) return direction === 'asc' ? 1 : -1;

        return 0;
    });

    setUsers(sortedUser);
  }

  const getSortIcon = (key) => (
    <span style={{ display: "inline-flex", flexDirection: "column", marginLeft: "5px" }}>
      <FontAwesomeIcon
        icon={faSortUp}
        style={{
          color: sortConfig.key === key && sortConfig.direction === "asc" ? "black" : "gray",
          fontSize: "12px",
        }}
      />
      <FontAwesomeIcon
        icon={faSortDown}
        style={{
          color: sortConfig.key === key && sortConfig.direction === "desc" ? "black" : "gray",
          fontSize: "12px",
        }}
      />
    </span>
  );

  const sortedUser = [...filteredData].sort((a, b) => {
    if (!sortTerm) return 0;
    return a[sortTerm].localeCompare(b[sortTerm]);
  });

  return (
    <div className="dashboard">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        {/* <NavBar /> */}
        <header className="header">
          <div className="header-left">
            <h1 className="header-title">Admin Dashboard</h1>
          </div>
          <div className="header-right">
            <button onClick={handleMenu} className="account-btn">
              Account
            </button>
            {anchorEl && (
              <div className="menu">
                <div onClick={handleClose}>Profile</div>
                <div onClick={handleClose}>Logout</div>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Summary */}
        <div className="summary-cards">
          <div className="card">
            <div className="card-title">Active Users</div>
            <div className="card-value">{summary.activeUsers}</div>
          </div>
          <div className="card">
            <div className="card-title">Pending Approvals</div>
            <div className="card-value">{summary.pendingApprovals}</div>
          </div>
          <div className="card">
            <div className="card-title">Pending Payments</div>
            <div className="card-value">{summary.pendingPayments}</div>
          </div>
          <div className="card">
            <div className="card-title">Courses</div>
            <div className="card-value">{summary.courses}</div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="data-table">
          <div className="data-table-header">
            <h3>Recent User Registrations</h3>
            <div className="filter-sort">
              <input
                type="text"
                placeholder="Search Here..."
                value={searchedTerm}
                onChange={(e) => setSearchedterm(e.target.value)}
              />
              <select onChange={(e) => setSortTerm(e.target.value)}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
              </select>
            </div>
          </div>
          <table className="dash-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name {getSortIcon("name")}</th>
                <th onClick={() => handleSort('email')}>Email {getSortIcon("email")}</th>
                <th onClick={() => handleSort('role')}>Role {getSortIcon('role')}</th>
              </tr>
            </thead>
            <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.userid}>
                <td>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</td>
                <td>{user.email}</td>
                <td>{user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev-1, 1))} disabled={currentPage === 1}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev+1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>

        {/* Reports & Charts */}
        <div className="charts">
          <div className="chart">
            <h4>User Activity</h4>
            <div className="pie-chart">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
              />
            </div>{" "}
            {/* Placeholder for PieChart */}
          </div>
          <div className="chart">
            <h4>Monthly Growth</h4>
            <div className="line-chart">
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                
              />
            </div>{" "}
            {/* Placeholder for LineChart */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
