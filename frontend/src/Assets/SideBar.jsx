// import React from "react";
// import { Link } from 'react-router-dom';
// import "./SideBar.css";
// import { SquaresFour, GraduationCap, Atom, UserCircle, ChartLine, UsersFour } from "@phosphor-icons/react";

// function SideBar() {
//     const menuItems = [
//         { to: "/dashboard", icon: <SquaresFour size={32}/>, label: "Dashboard" },
//         { to: "/course-manage", icon: <GraduationCap size={32} />, label: "Courses" },
//         { to: "/learning", icon: <Atom size={32} />, label: "Users" },
//         { to: "/batch-manage", icon: <UsersFour size={32} />, label: "Batches" },
//         { to: "/course-manage", icon: <GraduationCap size={32} />, label: "Courses" },
//         { to: "", icon: <ChartLine size={32} />, label: "Reports" },
//     ]
//     return(
//         <div className="sidebar">
//             <ul className="sidebar-menu-list">
//                 { menuItems.map((item, index) => (
//                     <li key={index}><Link to={item.to}>{item.icon} <span className="menu-text">{item.label}</span></Link></li>
//                 )) }
//             </ul>
//         </div>
//     );
// }
// export default SideBar;