// The fetchData function checks if data is already stored in localStorage
// If the data is present, it retrieves and uses it to avoid making unnecessary API calls.
// This optimization prevents multiple API calls by storing and reusing the fetched data, improving performance.
// If the data is not found in localStorage, it fetches it from the API, updates the state, and saves the data in localStorage for future use.

export const fetchData = async (
    setTickets,
    setUsers,
    setError,
    groupBy,
    handleGrouping
) => {
    const savedData = localStorage.getItem("apiData");

    if (savedData) {
        const { tickets: savedTickets, users: savedUsers } =
            JSON.parse(savedData);
        setTickets(savedTickets);
        setUsers(savedUsers);
        handleGrouping(groupBy, savedTickets, savedUsers);
    } else {
        try {
            const response = await fetch(
                "https://api.quicksell.co/v1/internal/frontend-assignment"
            );
            const data = await response.json();
            const fetchedTickets = data.tickets || [];
            const fetchedUsers = data.users || [];
            setTickets(fetchedTickets);
            setUsers(fetchedUsers);
            handleGrouping(groupBy, fetchedTickets, fetchedUsers);
            localStorage.setItem(
                "apiData",
                JSON.stringify({ tickets: fetchedTickets, users: fetchedUsers })
            );
        } catch (error) {
            console.error("Error fetching tickets:", error);
            setError("Failed to fetch tickets.");
        }
    }
};

export const groupTickets = (method, tickets, users) => {
    switch (method) {
        case "status":
            return groupByStatus(tickets);
        case "user":
            return groupByUser(tickets, users);
        case "priority":
            return groupByPriority(tickets);
        default:
            return { all: tickets };
    }
};

const groupByStatus = (tickets) => {
    const statuses = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];
    return statuses.reduce((acc, status) => {
        acc[status] = tickets.filter((ticket) => ticket.status === status);
        return acc;
    }, {});
};

const groupByUser = (tickets, users) => {
    return users.reduce((acc, user) => {
        acc[user.name] = tickets.filter((ticket) => ticket.userId === user.id);
        return acc;
    }, {});
};

const groupByPriority = (tickets) => {
    const priorityMapping = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No Priority",
    };

    return Object.keys(priorityMapping).reduce((acc, priority) => {
        const priorityName = priorityMapping[priority];
        acc[priorityName] = tickets.filter(
            (ticket) => ticket.priority === parseInt(priority)
        );
        return acc;
    }, {});
};

export const applyOrdering = (orderType, groupedData, setGroupedTickets) => {
    const orderedGroups = {};

    for (const group in groupedData) {
        if (groupedData[group] && Array.isArray(groupedData[group])) {
            if (orderType === "priority") {
                orderedGroups[group] = [...groupedData[group]].sort(
                    (a, b) => b.priority - a.priority
                );
            } else if (orderType === "title") {
                orderedGroups[group] = [...groupedData[group]].sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            }
        }
    }

    setGroupedTickets(orderedGroups);
};
