import React from "react";

import styles from "./Movie.module.scss";

const Movie = (props) => {
    console.log("props", props);
    return (
        <div className={styles.movie}>
            <p>{props.title}</p>
            <span>{props.description}</span>
        </div>
    );
};

export default Movie;
