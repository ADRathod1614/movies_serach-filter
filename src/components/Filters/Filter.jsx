import React from "react";

import styles from "./Filter.module.css";


const Filter = ({genres, handleGenreChange, handleSortChange, handleYearChange, getState}) => {
    return (
        <div id="filter" className={styles.toolbar}>
            <div>
                Sort By:      
                <select className={styles.sortby} value={getState.sort} onChange={(e) => handleSortChange(e.target.value)}>
                    <option className={styles.sort} value="popularity.desc">Popularity ▼</option>
                    <option className={styles.sort} value="popularity.asc">Popularity ▲</option>
                    <option className={styles.sort} value="release_date.desc">Release Date ▼</option>
                    <option className={styles.sort} value="release_date.asc">Release Date ▲</option>
                    <option className={styles.sort} value="revenue.desc">Earnings ▼</option>
                    <option className={styles.sort} value="revenue.asc">Earnings ▲</option>
                </select>
            </div>
        </div>
    );    
};

export default Filter;
