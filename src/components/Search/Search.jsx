import React from "react";

import styles from "./Search.module.css";


const Search = ({ handleSearchChange }) => {
    return (
        <div className={styles.searchBox}>
            <i className="fas fa-search"></i>
            <input className={styles.search} placeholder="Search..." type="search" name="search" results="5" id="search" onChange={(e) => handleSearchChange(e.target.value)}/>
        </div>
    );    
};

export default Search;
