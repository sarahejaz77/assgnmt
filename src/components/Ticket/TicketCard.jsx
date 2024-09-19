import React from "react";
import PropTypes from "prop-types";
import { BsExclamationSquareFill } from "react-icons/bs";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./TicketCard.css";

const TicketCard = ({ ticket, users }) => {
    const user = users.find((user) => user.id === ticket.userId);
    //nam ko split  karre hai to get initial
    const getInitials = (name) => {
        if (!name) return "";
        const nameParts = name.split(" ");
        return nameParts
            .map((part) => part.charAt(0))
            .join("")
            .toUpperCase();
    };

    return (
        <div className="ticket-card">
            <div className="ticket-card-content">
                <div className="ticket-id">{ticket.id}</div>
                <div className="ticket-title">{ticket.title}</div>
                <div className="ticket-tags">
                    <span className="priority-tag">
                        <BsExclamationSquareFill />
                    </span>
                    <span className="label-tag">
                        <div className="circle"></div>
                        {ticket.tag[0]}
                    </span>
                </div>
            </div>
            {user && (
                //user avatar is dynamically created based on the initials of the names of the users from api call
                <div className="user-avatar-container">
                    <UserAvatar
                        initials={getInitials(user.name)}
                        userImageUrl={user.avatar}
                    />
                </div>
            )}
        </div>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        tag: PropTypes.arrayOf(PropTypes.string).isRequired,
        userId: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
    }).isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ).isRequired,
};

export default TicketCard;
