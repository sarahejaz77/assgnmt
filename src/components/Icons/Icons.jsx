import ToDoIcon from "./icons/To-do.svg";
import InProgressIcon from "./icons/in-progress.svg";
import DoneIcon from "./icons/Done.svg";
import CancelledIcon from "./icons/Cancelled.svg";
import BacklogIcon from "./icons/Backlog.svg";
import UrgentPriorityIcon from "./icons/SVG - Urgent Priority colour.svg";
import HighPriorityIcon from "./icons/Img - High Priority.svg";
import MediumPriorityIcon from "./icons/Img - Medium Priority.svg";
import LowPriorityIcon from "./icons/Img - Low Priority.svg";
import NoPriorityIcon from "./icons/No-priority.svg";
import "./Icons.css";

export const StatusIcon = ({ status }) => {
    switch (status) {
        case "Todo":
            return <img src={ToDoIcon} alt="To-do" className="status-icon" />;
        case "In progress":
            return (
                <img
                    src={InProgressIcon}
                    alt="In progress"
                    className="status-icon"
                />
            );
        case "Done":
            return (
                <img src={DoneIcon} alt="Done" className="status-icon done" />
            );
        case "Cancelled":
            return (
                <img
                    src={CancelledIcon}
                    alt="Cancelled"
                    className="status-icon"
                />
            );
        case "Backlog":
            return (
                <img src={BacklogIcon} alt="Backlog" className="status-icon" />
            );
        default:
            return null;
    }
};

export const PriorityIcon = ({ priority }) => {
    switch (priority) {
        case "Urgent":
            return (
                <img
                    src={UrgentPriorityIcon}
                    alt="Urgent"
                    className="priority-icon urgent"
                />
            );
        case "High":
            return (
                <img
                    src={HighPriorityIcon}
                    alt="High Priority"
                    className="priority-icon"
                />
            );
        case "Medium":
            return (
                <img
                    src={MediumPriorityIcon}
                    alt="Medium Priority"
                    className="priority-icon"
                />
            );
        case "Low":
            return (
                <img
                    src={LowPriorityIcon}
                    alt="Low Priority"
                    className="priority-icon"
                />
            );
        case "No Priority":
            return (
                <img
                    src={NoPriorityIcon}
                    alt="No Priority"
                    className="priority-icon"
                />
            );
        default:
            return null;
    }
};
