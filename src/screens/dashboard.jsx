//api call is in utils.js
import React, { useEffect, useState, useCallback, useMemo } from "react";
import StatusGroup from "../components/Groups/StatusGroup";
import UserGroup from "../components/Groups/UserGroup";
import PriorityGroup from "../components/Groups/PriorityGroup";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/loader";
import {
    fetchData,
    groupTickets,
    applyOrdering,
} from "../components/Utils/Utils";
import "./Dashboard.css";

const Dashboard = () => {
    const [data, setData] = useState({ tickets: [], users: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [groupBy, setGroupBy] = useState(
        () => localStorage.getItem("groupBy") || "status"
    );
    const [orderBy, setOrderBy] = useState(
        () => localStorage.getItem("orderBy") || "priority"
    );

    const groupedTickets = useMemo(() => {
        const grouped = groupTickets(groupBy, data.tickets, data.users);
        return applyOrdering(orderBy, grouped);
    }, [data, groupBy, orderBy]);

    const handleGrouping = useCallback((method) => {
        setGroupBy(method);
        localStorage.setItem("groupBy", method);
    }, []);

    const handleSorting = useCallback((orderType) => {
        setOrderBy(orderType);
        localStorage.setItem("orderBy", orderType);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchData()
            .then((fetchedData) => {
                setData(fetchedData);
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch data. Please try again later.");
                setIsLoading(false);
            });
    }, []);

    if (error) return <div className="error">{error}</div>;

    return (
        <>
            {isLoading && <Loader />}
            <Navbar
                apiData={data}
                setGroupedData={handleGrouping}
                handleSorting={handleSorting}
            />
            <div className="dashboard-container">
                {groupBy === "status" && (
                    <StatusGroup
                        groupedTickets={groupedTickets}
                        users={data.users}
                    />
                )}
                {groupBy === "user" && (
                    <UserGroup
                        groupedTickets={groupedTickets}
                        users={data.users}
                    />
                )}
                {groupBy === "priority" && (
                    <PriorityGroup
                        groupedTickets={groupedTickets}
                        users={data.users}
                    />
                )}
            </div>
        </>
    );
};

export default Dashboard;
