import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./SideBar.css";
import { SquaresFour, GraduationCap, Atom, UserCircle, ChartLine, UsersFour, List } from "@phosphor-icons/react";
import Logo from "../Logo/Logo";

function SideBar({ isCollapsed, setIsCollapsed }) {

    const menuItems = [
        { to: "/dashboard", icon: <SquaresFour size={24} />, label: "Dashboard" },
        { to: "/coursemanage", icon: <GraduationCap size={24} />, label: "Courses" },
        { to: "/learning", icon: <Atom size={24} />, label: "Learning" },
        { to: "/usermanage", icon: <UsersFour size={24} />, label: "Users" },
        { to: "/batchmanage", icon: <ChartLine size={24} />, label: "Batches" }
    ];

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <ul className="sidebar-menu-list">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.to}>
                            {item.icon}
                            {!isCollapsed && <span className="menu-text">{item.label}</span>}
                        </Link> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;