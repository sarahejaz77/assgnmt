import React from "react";
import Column from "../Column/Column";
import UserAvatar from "../UserAvatar/UserAvatar"; // Import the UserAvatar component
import addIcon from "../Icons/icons/add.svg";
import menuIcon from "../Icons/icons/3 dot menu.svg";

const UserGroup = ({ groupedTickets, users }) => (
    <div className="status-group-container">
        {Object.keys(groupedTickets).map((user) => {
            const currentUser = users.find((u) => u.name === user);

            return (
                <Column
                    key={user}
                    title={user}
                    count={groupedTickets[user]?.length || 0}
                    icon={
                        currentUser ? (
                            <UserAvatar
                                initials={currentUser.name
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")}
                                userImageUrl={currentUser.avatar}
                            />
                        ) : (
                            <UserAvatar initials={user.charAt(0)} /> // Fallback if user data is missing
                        )
                    }
                    tickets={groupedTickets[user] || []}
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
            );
        })}
    </div>
);

export default UserGroup;
