// Utils.js
const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            tickets: data.tickets || [],
            users: data.users || [],
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const groupTickets = (method, tickets = [], users = []) => {
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
    const statusGroups = {
        Backlog: [],
        Todo: [],
        "In progress": [],
        Done: [],
        Cancelled: [],
    };
    tickets.forEach((ticket) => {
        if (statusGroups.hasOwnProperty(ticket.status)) {
            statusGroups[ticket.status].push(ticket);
        } else {
            statusGroups["Backlog"].push(ticket);
        }
    });
    return statusGroups;
};

const groupByUser = (tickets, users) => {
    const userGroups = {};
    users.forEach((user) => {
        userGroups[user.name] = tickets.filter(
            (ticket) => ticket.userId === user.id
        );
    });
    return userGroups;
};

const groupByPriority = (tickets) => {
    const priorityGroups = {
        "No Priority": [],
        Low: [],
        Medium: [],
        High: [],
        Urgent: [],
    };
    const priorityMap = {
        0: "No Priority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
    };
    tickets.forEach((ticket) => {
        const priorityName = priorityMap[ticket.priority] || "No Priority";
        priorityGroups[priorityName].push(ticket);
    });
    return priorityGroups;
};

export const applyOrdering = (orderType, groupedData) => {
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
            } else {
                orderedGroups[group] = groupedData[group];
            }
        } else {
            orderedGroups[group] = groupedData[group];
        }
    }
    return orderedGroups;
};
