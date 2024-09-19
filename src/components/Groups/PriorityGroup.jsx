import React from "react";
import Column from "../Column/Column";
import { PriorityIcon } from "../Icons/Icons";
import addIcon from "../Icons/icons/add.svg";
import menuIcon from "../Icons/icons/3 dot menu.svg";
const PriorityGroup = ({ groupedTickets, users }) => (
    <div className="status-group-container">
        {["Urgent", "High", "Medium", "Low", "No Priority"].map((priority) => (
            <Column
                key={priority}
                title={priority}
                count={groupedTickets[priority]?.length || 0}
                icon={<PriorityIcon priority={priority} />}
                tickets={groupedTickets[priority] || []}
                users={users}
                extraIcons={
                    <div className="extra-icons-container">
                        <img src={addIcon} alt="Add" className="add-icon" />
                        <img src={menuIcon} alt="Menu" className="menu-icon" />
                    </div>
                }
            />
        ))}
    </div>
);

export default PriorityGroup;
