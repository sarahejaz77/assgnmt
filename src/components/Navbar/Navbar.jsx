import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Display from "../Icons/icons/Display.svg";
import Down from "../Icons/icons/down.svg";
//this is to mosstly handle grouping and sorting
const Navbar = ({ setGroupedData, handleSorting }) => {
    const [isDisplayDropdownOpen, setDisplayDropdownOpen] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState("status");
    const [selectedOrdering, setSelectedOrdering] = useState("priority");

    useEffect(() => {
        const savedGrouping = localStorage.getItem("grouping");
        const savedOrdering = localStorage.getItem("ordering");

        if (savedGrouping) {
            setSelectedGrouping(savedGrouping);
        }
        if (savedOrdering) {
            setSelectedOrdering(savedOrdering);
        }
    }, []);

    const handleGroupingChange = (method) => {
        setSelectedGrouping(method);
        localStorage.setItem("grouping", method);
        setGroupedData(method);
    };

    const handleSortChange = (sortType) => {
        setSelectedOrdering(sortType);
        localStorage.setItem("ordering", sortType);
        handleSorting(sortType);
    };

    const handleDisplayClick = () => {
        setDisplayDropdownOpen(!isDisplayDropdownOpen);
    };

    return (
        <nav className="display-navbar">
            <div className="display-dropdown">
                <button
                    className="display-dropdown-btn"
                    onClick={handleDisplayClick}
                >
                    <img src={Display} alt="Display" width={16} height={16} />
                    Display
                    <i className="icon-chevron-down"></i>
                    <img src={Down} alt="Down" width={16} height={16} />
                </button>

                {isDisplayDropdownOpen && (
                    <div className="display-dropdown-content">
                        <div className="display-dropdown-section">
                            <div className="dropdown-label">Grouping</div>
                            <select
                                value={selectedGrouping}
                                onChange={(e) =>
                                    handleGroupingChange(e.target.value)
                                }
                            >
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>

                        <div className="display-dropdown-section">
                            <div className="dropdown-label">Ordering</div>
                            <select
                                value={selectedOrdering}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)
                                }
                            >
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
