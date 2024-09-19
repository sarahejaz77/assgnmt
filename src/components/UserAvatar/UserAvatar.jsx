import React, { useMemo } from "react";
import PropTypes from "prop-types";

const generateColor = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
        hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
};

const UserAvatar = ({ initials, userImageUrl }) => {
    const backgroundColor = useMemo(() => generateColor(initials), [initials]);

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
        backgroundColor,
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
    initials: PropTypes.string.isRequired,
    userImageUrl: PropTypes.string,
};

export default React.memo(UserAvatar);
