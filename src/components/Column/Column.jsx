import React from "react";
import TicketCard from "../Ticket/TicketCard";
import "./Column.css";

const Column = ({ title, count, icon, tickets, users, extraIcons }) => (
    <div className="status-column">
        <div className="column-header">
            <div className="header-content">
                <div>{icon}</div>
                <div>
                    <h5 className="header-title">{title}</h5>
                </div>
                <div>
                    <h5 className="header-count">{count}</h5>
                </div>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
                {extraIcons && <div className="extra-icons">{extraIcons}</div>}
            </div>
        </div>

        <div className="ticket-cards">
            {/* ticket dynamically render hoga */}
            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} users={users} />
                ))
            ) : (
                <p className="no-tickets">No tickets in this category</p>
            )}
        </div>
    </div>
);

export default Column;
