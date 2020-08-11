import React, { useState } from "react";

import styles from "./Recharts.module.scss";

import movies from "../../data/movies";
import HighlightAndZoomLineChart from "./HighlightAndZoomLineChart/HighlightAndZoomLineChart";
import Simple from "./Simple/Simple";
import Movies from "../components/Movies/Movies";

const Recharts = (props) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    return (
        <div>
            <h1>Recharts</h1>
            <main className={styles.main}>
                {/* <HighlightAndZoomLineChart /> */}
                <Simple
                    className={styles.simple}
                    setFilteredMovies={setFilteredMovies}
                />
                <Movies filteredMovies={filteredMovies} />
            </main>
        </div>
    );
};

export default Recharts;
