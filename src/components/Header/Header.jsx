import React from "react";

import styles from "./Header.module.css";

const Footer = () => {
    return (
        <div id="navbar" className={styles.navbar}>
            <h1 className={styles.logo}>
                <a href="/">Z-Flix</a>
            </h1>
            <div id="modeToggle" className={styles.modeToggle}>Wishlist<i className="far fa-moon"></i></div>
        </div>
    );
};

export default Footer;
