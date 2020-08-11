import React from "react";

import Movie from "./components/Movie/Movie";

const Movies = ({ filteredMovies }) => {
    return (
        filteredMovies && (
            <div>
                {filteredMovies.map((m) => (
                    <Movie key={m.id} {...m} />
                ))}
            </div>
        )
    );
};

export default Movies;
