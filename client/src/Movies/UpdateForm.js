import React, { useState } from 'react';

const UpdateForm = props => {
    const [movie, setMovie] = useState({
        title: "", director: "", metascore: "", stars: []
    });

    const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

    // Function that takes in an event 
    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            if(starIndex === index) {
                return e.target.value;
            } else { return star }
            })})
    }

    return (
        <form>
            <input type="text"
                   name="title"
                   placeholder="title"
                   value={movie.title}
                   onChange={handleChange}
            />
            <input type="text"
                   name="director"
                   placeholder="director"
                   value={movie.director}
                   onChange={handleChange}
            />
            <input type="text"
                   name="metascore"
                   placeholder="metascore"
                   value={movie.metascore}
                   onChange={handleChange}
            />
            {movie.actors.map((starName, index) => {
                return  <input type="text"
                               placeholder="star"
                               value={starName}
                               onChange={handleStar(index)}
                />
            })}

        </form>
    )
};

export default UpdateForm;