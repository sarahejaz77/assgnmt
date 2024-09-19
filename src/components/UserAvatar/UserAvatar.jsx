import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ initials, userImageUrl }) => {
    const randomColor = () =>
        `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

    const avatarStyle = {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333",
        backgroundColor: randomColor(),
        overflow: "hidden",
    };

    return (
        <div style={avatarStyle}>
            {userImageUrl ? (
                <img
                    src={userImageUrl}
                    alt="User"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                initials
            )}
        </div>
    );
};

UserAvatar.propTypes = {
    initials: PropTypes.string,
    userImageUrl: PropTypes.string,
};

export default UserAvatar;
