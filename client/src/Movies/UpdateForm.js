import React, { useState, useEffect } from 'react';
import axios from "axios";

const UpdateForm = props => {
    const [movie, setMovie] = useState({
        title: "", director: "", metascore: "", stars: []
    });

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    useEffect (() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);

    const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                console.log(res);
                props.history.push('/');
            })
            .catch(err => console.log(err.response))
    }

    // Function that takes in an event
    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            if(starIndex === index) {
                return e.target.value;
            } else { return star }
            })})
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {movie.stars.map((starName, index) => {
                return  <input type="text"
                               placeholder="star"
                               value={starName}
                               onChange={handleStar(index)}
                />
            })}
            <button type="submit">Update Movie</button>
        </form>
    )
};

export default UpdateForm;