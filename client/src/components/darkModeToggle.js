import React from "react";
import moon from "./svgs/day-night.svg";
import useDarkMode from "use-dark-mode";
const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
    return (
        <>
            <div
                className="float-btn"
                onClick={darkMode.toggle}
                style={{ zIndex: "100" }}
            >
                <img src={moon} alt="plane" height="60" />
            </div>
        </>
    );
};
export default DarkModeToggle;
