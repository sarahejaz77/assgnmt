import React, { useEffect, useState, useCallback } from "react";
import StatusGroup from "../components/Groups/StatusGroup";
import UserGroup from "../components/Groups/UserGroup";
import PriorityGroup from "../components/Groups/PriorityGroup";
import Navbar from "../components/Navbar/Navbar";
import {
    fetchData,
    groupTickets,
    applyOrdering,
} from "../components/Utils/Utils";
import "./Dashboard.css";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupedTickets, setGroupedTickets] = useState({});
    const [error, setError] = useState(null);
    const [groupBy, setGroupBy] = useState(
        () => localStorage.getItem("groupBy") || "status"
    );
    const [orderBy, setOrderBy] = useState(
        () => localStorage.getItem("orderBy") || "priority"
    );

    const handleGrouping = useCallback(
        (method, ticketsData = tickets, usersData = users) => {
            setGroupBy(method);
            localStorage.setItem("groupBy", method);
            const grouped = groupTickets(method, ticketsData, usersData);
            setGroupedTickets(grouped);
            applyOrdering(orderBy, grouped, setGroupedTickets);
        },
        [tickets, users, orderBy]
    );

    useEffect(() => {
        fetchData(setTickets, setUsers, setError, groupBy, handleGrouping);
    }, [groupBy, handleGrouping]);

    const handleSorting = (orderType) => {
        setOrderBy(orderType);
        localStorage.setItem("orderBy", orderType);
        applyOrdering(orderType, groupedTickets, setGroupedTickets);
    };

    return (
        <>
            <Navbar
                apiData={{ tickets, users }}
                setGroupedData={(method) =>
                    handleGrouping(method, tickets, users)
                }
                handleSorting={handleSorting}
            />
            <div className="dashboard-container">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {groupBy === "status" && (
                            <StatusGroup
                                groupedTickets={groupedTickets}
                                users={users}
                            />
                        )}
                        {groupBy === "user" && (
                            <UserGroup
                                groupedTickets={groupedTickets}
                                users={users}
                            />
                        )}
                        {groupBy === "priority" && (
                            <PriorityGroup
                                groupedTickets={groupedTickets}
                                users={users}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Dashboard;
