import addIcon from "../Icons/icons/add.svg";
import menuIcon from "../Icons/icons/3 dot menu.svg";

import React from "react";
import Column from "../Column/Column";
import { StatusIcon } from "../Icons/Icons";

const StatusGroup = ({ groupedTickets, users }) => (
    <div className="status-group-container">
        {["Todo", "In progress", "Backlog", "Done", "Cancelled"].map(
            (status) => (
                <Column
                    key={status}
                    title={status}
                    count={groupedTickets[status]?.length || 0}
                    icon={<StatusIcon status={status} />}
                    tickets={groupedTickets[status] || []}
                    users={users}
                    extraIcons={
                        <div className="extra-icons-container">
                            <img src={addIcon} alt="Add" className="add-icon" />
                            <img
                                src={menuIcon}
                                alt="Menu"
                                className="menu-icon"
                            />
                        </div>
                    }
                />
            )
        )}
    </div>
);

export default StatusGroup;
