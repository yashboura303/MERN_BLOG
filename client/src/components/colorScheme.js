import React from "react";
import moon from "./svgs/day-night.svg";
export default function ColorScheme({ children }) {
    const [darkMode, setDarkMode] = React.useState(getInitialMode());
    React.useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(darkMode));
    }, [darkMode]);

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem("dark"));
        const userPrefersDark = getPrefColorScheme();
        if (isReturningUser) {
            return savedMode;
        } else if (userPrefersDark) {
            return true;
        } else {
            return false;
        }
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div
                className="float-btn"
                onClick={() => setDarkMode(prevMode => !prevMode)}
            >
                <img src={moon} alt="plane" height="60" />
            </div>
            {children}
        </div>
    );
}
